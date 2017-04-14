import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { range } from 'lodash';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import { get } from 'utils/localStorage';

import {
  createPaymentSource,
} from 'containers/App/actions';
import {
  selectPaymentSource,
} from 'containers/App/selectors';

import PPDropdown from 'elements/atm.DropDown';
import PPTextField from 'elements/atm.TextField';
import PPButton from 'elements/atm.Button';
import Title from 'elements/atm.Title';
import Center from 'elements/atm.Center';
import PPLink from 'elements/atm.Link';

import {
  selectPlan,
} from '../selectors';

const monthOptions = moment.months().map((month, index) => {
  let mm = index + 1;
  if (mm >= 10) {
    mm = `${mm}`;
  } else {
    mm = `0${mm}`;
  }

  return { value: (index + 1).toString(), label: `${mm} - ${month}` };
});
const yearOptions = range(2018, 2033).map((year) => ({
  value: year.toString(),
  label: year,
}));

class SignupCheckout extends Component {
  static propTypes = {
    plan: PropTypes.object,
    paymentSource: PropTypes.object,
    createPaymentSource: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const userInfo = get('signup') || {};

    this.state = {
      name: userInfo.name,
      expirationYear: null,
      expirationMonth: null,
      nameOnCard: {
        value: '',
        error: '',
      },
      cardNumber: {
        value: '',
        error: '',
      },
      cvc: {
        value: '',
        error: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.plan !== nextProps.plan) {
      const detail = nextProps.plan.detail;
      if (!detail.requires_payment) {
        browserHistory.push('/');
      }
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    Stripe.card.createToken({
      number: this.state.cardNumber.value,
      cvc: this.state.cvc.value,
      exp_month: this.state.expirationMonth.value,
      exp_year: this.state.expirationYear.value,
      name: this.state.nameOnCard.value,
    }, this.handleStripeResponse);
  }

  onMonthChange = (option) => {
    this.setState({ expirationMonth: option });
  }

  onYearChange = (option) => {
    this.setState({ expirationYear: option });
  }

  onFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: {
        value,
      },
    });
  }

  handleStripeResponse = (status, response) => {
    if (response.error) {
      alert(response.error.message);
    } else {
      this.props.createPaymentSource({
        account_id: cookie.load('account_id'),
        stripe_token: response.id,
      });
    }
  }

  render() {
    return (
      <div>
        <Title>Hi {this.state.name}</Title>
        <Center>Please provide your billing information below.</Center>
        <form onSubmit={this.onFormSubmit} style={{ marginTop: '40px' }}>
          <PPTextField
            type="text"
            name="nameOnCard"
            hintText="Example Name"
            floatingLabelText="Name On Card"
            value={this.state.nameOnCard.value}
            errorText={this.state.nameOnCard.error}
            onChange={this.onFieldChange}
          />
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <PPDropdown label="Credit Card Expiration Date" value={this.state.expirationMonth} options={monthOptions} onChange={this.onMonthChange} />
            </div>
            <div className="col-sm-12 col-md-4">
              <PPDropdown label="" value={this.state.expirationYear} options={yearOptions} onChange={this.onYearChange} />
            </div>
          </div>
          <div className="row" style={{ marginTop: '15px' }}>
            <div className="col-sm-12 col-md-9">
              <PPTextField
                type="text"
                name="cardNumber"
                hintText="0000-0000-0000-0000"
                floatingLabelText="Credit Card Number"
                value={this.state.cardNumber.value}
                errorText={this.state.cardNumber.error}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="col-sm-12 col-md-3">
              <PPTextField
                type="text"
                name="cvc"
                hintText="Optional"
                floatingLabelText="CVC"
                value={this.state.cvc.value}
                errorText={this.state.cvc.error}
                onChange={this.onFieldChange}
              />
            </div>
          </div>
          <Center style={{ marginTop: '30px' }}><PPLink to="/coupon">Add Coupon Code</PPLink></Center>
          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Thanks, now get started" primary /></Center>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    createPaymentSource: (payload) => dispatch(createPaymentSource(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  plan: selectPlan(),
  paymentSource: selectPaymentSource(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupCheckout);

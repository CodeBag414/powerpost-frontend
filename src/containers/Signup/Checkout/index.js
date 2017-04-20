/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { range } from 'lodash';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import theme from 'theme';
import { get } from 'utils/localStorage';

import { toastr } from 'lib/react-redux-toastr';

import {
  createPaymentSource,
  applyCoupon,
  postSubscription,
  fetchCurrentPlan,
} from 'containers/App/actions';
import {
  selectPaymentSource,
  selectCoupon,
  selectSubscription,
  selectCurrentPlan,
} from 'containers/App/selectors';

import Loading from 'components/Loading';

import Dropdown from 'elements/atm.Dropdown';
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

const yearOptions = range(2017, 2033).map((year) => ({
  value: year.toString(),
  label: year,
}));

class SignupCheckout extends Component {
  static propTypes = {
    plan: PropTypes.object,
    paymentSource: PropTypes.object,
    coupon: PropTypes.object,
    subscription: PropTypes.object,
    location: PropTypes.object,
    currentPlan: PropTypes.object,
    createPaymentSource: PropTypes.func,
    applyCoupon: PropTypes.func,
    postSubscription: PropTypes.func,
    discount: PropTypes.func,
    fetchCurrentPlan: PropTypes.func,
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
      coupon: {
        value: '',
        error: '',
      },
      couponViewType: 0,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.plan !== nextProps.plan) {
      const { details } = nextProps.plan;
      if (!details.requires_payment) {
        browserHistory.push('/');
      }
    } else if (this.props.coupon !== nextProps.coupon) {
      const { details, error } = nextProps.coupon;
      if (!error) {
        this.props.discount(details.amount_off, details.percent_off);

        toastr.success('Success', 'Your coupon code has been applied!');
        this.setState({
          couponViewType: 2,
        });
      } else {
        toastr.error(error);
        this.setState({
          coupon: {
            value: this.state.coupon.value,
            error,
          },
        });
      }
    } else if (this.props.paymentSource !== nextProps.paymentSource) {
      const { fetching, error } = nextProps.paymentSource;

      if (!fetching) {
        if (!error) {     // Create Source Succeeded
          let payload = {
            account_id: cookie.load('account_id'),
            plan_id: nextProps.location.query.plan_id,
          };
          if (this.state.couponViewType === 2) {
            payload = {
              ...payload,
              coupon: this.state.coupon.value,
            };
          }
          this.props.postSubscription(payload);
        } else {
          toastr.error(error.toString());
          this.setState({
            loading: false,
          });
        }
      } else {
        this.setState({
          loading: true,
        });
      }
    } else if (this.props.subscription !== nextProps.subscription) {
      const { fetching, error } = nextProps.subscription;

      if (!fetching) {
        if (!error) {
          this.props.fetchCurrentPlan({
            accountId: cookie.load('account_id'),
            selectedPlan: nextProps.location.query.plan_id,
          });
        } else {
          toastr.error(error.toString());
          this.setState({
            loading: false,
          });
        }
      }
    } else if (this.props.currentPlan !== nextProps.currentPlan) {
      const { fetching, error } = nextProps.subscription;

      if (!fetching) {
        if (error) {
          toastr.error(error.toString());
          this.setState({
            loading: false,
          });
        }
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

  getCouponView = () => {
    const { couponViewType } = this.state;
    switch (couponViewType) {
      case 0:
        return <Center style={{ marginTop: '30px' }}><PPLink onClick={this.showCouponView} >Add Coupon Code</PPLink></Center>;
      case 1:
        return (
          <div className="row">
            <div className="col-sm-12 col-md-9">
              <PPTextField
                type="text"
                name="coupon"
                floatingLabelText="Coupon Code"
                value={this.state.coupon.value}
                errorText={this.state.coupon.error}
                onChange={this.onFieldChange}
              />
            </div>
            <div className="col-sm-12 col-md-3">
              <PPButton label="Apply Coupon" primary style={{ marginTop: '30px' }} onClick={this.applyCoupon} />
            </div>
          </div>
        );
      case 2:
        return (
          <div
            style={{
              background: 'green',
              padding: '10px 20px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            Your coupon code has been applied!
            <a
              style={{ color: 'white' }}
              onClick={this.removeCoupon}
            >
              Remove
            </a>
          </div>
        );
      default:
        return null;
    }
  }

  applyCoupon = () => {
    this.props.applyCoupon(this.state.coupon.value);
  }

  removeCoupon = (event) => {
    event.preventDefault();
    this.props.discount(null, null);
    this.setState({
      couponViewType: 0,
      coupon: {
        value: '',
      },
    });
  }

  showCouponView = () => {
    this.setState({
      couponViewType: 1,
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
    const { loading } = this.state;

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
              <Dropdown label="Credit Card Expiration Date" value={this.state.expirationMonth} options={monthOptions} onChange={this.onMonthChange} />
            </div>
            <div className="col-sm-12 col-md-4">
              <Dropdown label="" value={this.state.expirationYear} options={yearOptions} onChange={this.onYearChange} />
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
          { this.getCouponView() }
          <Center style={{ marginTop: '30px' }}><PPButton type="submit" label="Thanks, now get started" primary /></Center>
        </form>
        { loading && <Loading /> }
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    createPaymentSource: (payload) => dispatch(createPaymentSource(payload)),
    applyCoupon: (payload) => dispatch(applyCoupon(payload)),
    postSubscription: (payload) => dispatch(postSubscription(payload)),
    fetchCurrentPlan: (payload) => dispatch(fetchCurrentPlan(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  plan: selectPlan(),
  paymentSource: selectPaymentSource(),
  coupon: selectCoupon(),
  subscription: selectSubscription(),
  currentPlan: selectCurrentPlan(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupCheckout);

/* eslint-disable camelcase, no-shadow, radix */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LeftPane from 'components/LeftPane';
import RightPane from 'components/RightPane';
import imgLogo from 'assets/images/logo.png';

import Wrapper from './Wrapper';
import FormWrapper from './FormWrapper';
import Topbar from './Topbar';

import {
  fetchPlan,
} from './actions';
import {
  selectPlan,
} from './selectors';

class Signup extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    plan: PropTypes.object,
    fetchPlan: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      amountOff: null,
      percentOff: null,
    };
  }

  componentWillMount() {
    const { fetchPlan, location } = this.props;

    fetchPlan(location.query.plan_id);
  }

  discount = (amountOff, percentOff) => {
    this.setState({
      amountOff,
      percentOff,
    });
  }

  render() {
    const { children, plan } = this.props;
    const { amountOff, percentOff } = this.state;

    const {
      title,
      price,
      term_length,
      features = [],
    } = plan.details || {};
    let newPrice = price;

    if (amountOff) {
      newPrice -= amountOff / 100;
    } else if (percentOff) {
      newPrice *= (100 - percentOff) / 100;
    }

    return (
      <Wrapper>
        <LeftPane>
          <img src={imgLogo} alt="Logo" />
          <div style={{ marginTop: '120px', fontSize: '2rem' }}>PowerPost Business Plan</div>
          <div style={{ marginTop: '10px', fontSize: '4.5rem' }}>{title}</div>
          <div style={{ marginTop: '15px', fontSize: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>${parseInt(newPrice)}</span>&nbsp;
            <span>{term_length}</span>
          </div>
          <div style={{ marginTop: '15px', fontSize: '1.5rem' }}>
            { features.join('. ') }
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}>Not the plan you want, we've got you covered. View Plans</div>
        </LeftPane>
        <RightPane>
          <Topbar />
          <FormWrapper>
            { React.cloneElement(children, {
              discount: this.discount,
            })
            }
          </FormWrapper>
        </RightPane>
      </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  plan: selectPlan(),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPlan: (planId) => dispatch(fetchPlan(planId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { get } from 'lodash';

import {
  redeemToken,
} from './actions';
import {
  selectRedeem,
} from './selectors';

import Wrapper from './Wrapper';

class Redeem extends Component {
  static propTypes = {
    params: PropTypes.object,
    redeem: PropTypes.object,
    redeemToken: PropTypes.func,
  }

  componentWillMount() {
    const { redeemToken, params } = this.props;
    redeemToken(params.token);
  }

  componentWillReceiveProps(nextProps) {
    const { redeem } = nextProps;

    if (this.props.redeem !== redeem) {
      const error = redeem.get('error');
      if (error) {
        alert(error.message);
        if (error.code === '700') {
          browserHistory.push('/login');
        }
      } else {
        const detail = redeem.get('detail');

        const selectedPlan = get(detail, 'user_own_account.properties.selected_plan');
        const accountTypeId = get(detail, 'user_own_account.account_type_id');

        if (!detail.api_key) {
          alert('Something is wrong with returned api_key');
          return;
        }

        cookie.save('token', detail.api_key, { path: '/' });
        cookie.save('account_id', detail.user_own_account.account_id, { path: '/' });

        if (accountTypeId === '5' && selectedPlan) {
          browserHistory.push(`/signup/checkout?plan_id=${selectedPlan}`);
        } else {
          browserHistory.push('/');
        }
      }
    }
  }

  render() {
    const { redeem } = this.props;

    return (
      redeem.error ?
        <Wrapper>
          Redemption Failed. Please Try Again!
        </Wrapper>
        :
        <Wrapper>
          Redeeming!
        </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  redeem: selectRedeem,
});

export const mapDispatchToProps = (dispatch) => ({
  redeemToken: (token) => dispatch(redeemToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redeem);

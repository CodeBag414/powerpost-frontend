import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  redeemToken,
} from './actions';
import {
  selectRedemption,
} from './selectors';

import Wrapper from './Wrapper';

class Redeem extends Component {
  static propTypes = {
    location: PropTypes.object,
    redeemToken: PropTypes.object,
    selectRedemption: PropTypes.func,
  }

  componentWillMount() {
    const { redeemToken, location } = this.props;
    console.log('*****', this.props);
    // redeemToken(location.query.plan_id);
  }

  render() {
    const { redemption } = this.props;

    return (
      <Wrapper>
        Redeeming!
      </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  redemption: selectRedemption(),
});

export const mapDispatchToProps = (dispatch) => ({
  redeemToken: (token) => dispatch(redeemToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redeem);

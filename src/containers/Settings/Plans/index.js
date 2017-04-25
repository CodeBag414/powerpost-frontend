import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { UserCanTeam } from 'config.routes/UserRoutePermissions';
import Button from 'elements/atm.Button';

import { makeSelectCurrentAccount } from 'containers/Main/selectors';

import Wrapper from './Wrapper';
import CardWrapper from './CardWrapper';
import PaymentCard from './PaymentCard';

import {
  fetchSubscriptions,
} from '../actions';
import {
  selectSubscriptions,
} from '../selectors';

export class Plans extends Component {
  static propTypes = {
    userAccount: PropTypes.object,
    subscriptions: PropTypes.object,
    fetchSubscriptions: PropTypes.func,
  }

  componentDidMount() {
    const { userAccount } = this.props;

    this.props.fetchSubscriptions(userAccount.account_id);
  }

  getCurrentPlanDOM = () => {
    const { subscriptions: { details, error } } = this.props;

    return (
      <CardWrapper>
        <div className="title-label">
          Current Plan
        </div>
        <div className="title">
          Business
        </div>
        <div className="divider" />
        { error ||
          (details &&
            <div>
              <section>
                <div className="header">Status</div>
                <div className="value">{details.cancel_at_period_end ? 'Will cancel at current period end' : details.status}</div>
              </section>
              <section>
                <div className="header">Plan Started</div>
                <div className="value">{moment(details.created * 1000).format('dddd, MMMM D, YYYY')}</div>
              </section>
              <section>
                <div className="header">Current Period Began</div>
                <div className="value">{moment(details.current_period_start * 1000).format('dddd, MMMM D, YYYY')}</div>
              </section>
              <section>
                <div className="header">Current Period End</div>
                <div className="value">{moment(details.current_period_end * 1000).format('dddd, MMMM D, YYYY')}</div>
              </section>
              <section>
                <div className="header">Billed</div>
                <div className="value">${details.plan.amount / 100}/{details.plan.interval}</div>
              </section>
              <Button>Cancel Plan</Button>
            </div>
          )
        }
      </CardWrapper>
    );
  }

  render() {
    return (
      <Wrapper>
        <div className="left-pane">
          { this.getCurrentPlanDOM() }
          <PaymentCard />
        </div>
        <div className="right-pane">
          <p className="title">Charge History</p>
          <table>
            <tbody>
              <tr>
                <th className="date">DATE</th>
                <th className="paid">AMOUNT PAID</th>
                <th className="refunded">AMOUNT REFUNDED</th>
                <th className="method">PAYMENT METHOD</th>
                <th className="status">STATUS</th>
              </tr>
              <tr>
                <td>April 11</td>
                <td>199.00 USD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  userAccount: makeSelectCurrentAccount(),
  subscriptions: selectSubscriptions(),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: (accountId) => dispatch(fetchSubscriptions(accountId)),
});

export default UserCanTeam(connect(mapStateToProps, mapDispatchToProps)(Plans));

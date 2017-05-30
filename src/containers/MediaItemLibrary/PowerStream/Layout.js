import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { browserHistory } from 'react-router';
import { find, filter } from 'lodash';

import { toastr } from 'lib/react-redux-toastr';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import Loading from 'components/Loading';
import CloseableDialog from 'elements/atm.CloseableDialog';

import {
  updatePostSetRequest,
} from 'containers/App/actions';

import {
  fetchStreamPostSetsRequest,
  inviteEmailToStreamRequest,
} from '../actions';
import {
  makeSelectPostSets,
  makeSelectPostSet,
  makeSelectEmailInvited,
} from '../selectors';

import ErrorWrapper from './ErrorWrapper';
import Wrapper from './Wrapper';
import TabBar from './TabBar';
import PostSetBox from './PostSetBox';
import InviteForm from './InviteForm';

class PowerStreamLayout extends Component {
  static propTypes = {
    accountId: PropTypes.string,
    streamCategory: PropTypes.string,
    streamId: PropTypes.string,
    userAccount: PropTypes.object,
    postSets: ImmutablePropTypes.map,
    postSet: ImmutablePropTypes.map,
    emailInvited: ImmutablePropTypes.map,
    fetchStreamPostSets: PropTypes.func,  // eslint-disable-line
    updatePostSet: PropTypes.func,
    inviteEmailToStream: PropTypes.func,
  }

  state = {
    error: '',
    shareDialogVisible: false,
  }

  componentWillMount() {
    this.changeStreamLink(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.streamCategory !== nextProps.streamCategory ||
      this.props.streamId !== nextProps.streamId) {
      this.changeStreamLink(nextProps);
    }

    if (this.props.postSet !== nextProps.postSet &&
      !nextProps.postSet.get('processing')) {
      if (nextProps.postSet.get('error')) {
        toastr.error('The post has not been deleted from the stream.');
      } else {
        toastr.success('Success', 'The post has been deleted from the stream');
      }
    }

    if (this.props.emailInvited !== nextProps.emailInvited &&
      !nextProps.emailInvited.get('processing')) {
      if (!nextProps.emailInvited.get('error')) {
        this.toggleShareDialog();
      }
    }
  }

  changeStreamLink({ userAccount, accountId, streamCategory, streamId, fetchStreamPostSets }) {
    let newStreamId = streamId;

    if (!streamId) {
      if (streamCategory === 'owned') {
        newStreamId = userAccount.account_streams[0].stream_id;
      } else {
        if (!userAccount.shared_streams || userAccount.shared_streams.length === 0) {
          this.setState({
            error: 'This brand does not have any current subscriptions to power streams.',
          });
          return;
        }

        newStreamId = userAccount.shared_streams[0].stream_id;
      }
      this.setState({
        error: '',
      });
      browserHistory.push(`/account/${accountId}/library/shared_streams/${streamCategory}/${newStreamId}`);
    }
    fetchStreamPostSets(newStreamId, {
      query_by: 'stream_id',
    });
  }

  handlePostSet = (removing, postSet) => {
    const { updatePostSet, streamId } = this.props;
    const postSetObj = postSet.toJS();
    if (removing) {
      updatePostSet({
        ...postSetObj,
        id: postSetObj.post_set_id,
        stream_ids: filter(postSetObj.stream_ids || [], (id) => id !== streamId),
      }, 'powerstream');
    } else {

    }
  }

  sendInvite = (email) => {
    const { inviteEmailToStream, streamId } = this.props;

    inviteEmailToStream({
      stream_id: streamId,
      email,
      message: 'Invite to my stream',
    });
  }

  toggleShareDialog = () => {
    this.setState({
      shareDialogVisible: !this.state.shareDialogVisible,
    });
  }

  render() {
    const {
      postSets,
      userAccount,
      accountId,
      streamCategory,
      streamId,
    } = this.props;
    const {
      error,
      shareDialogVisible,
    } = this.state;

    if (error) {
      return (
        <Wrapper>
          <ErrorWrapper>
            { error }
          </ErrorWrapper>
        </Wrapper>
      );
    }

    if (postSets.get('isFetching')) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      );
    }

    const owned = streamCategory === 'owned';
    const streams = owned ?
      userAccount.account_streams : userAccount.shared_streams;

    const tabs = streams.map((s) => ({
      label: s.title,
      link: `/account/${accountId}/library/shared_streams/${streamCategory}/${s.stream_id}`,
    }));
    const currentStream = find(streams, { stream_id: streamId });
    const streamName = (currentStream || {}).title;

    return (
      <Wrapper>
        <TabBar
          owned={owned}
          tabs={tabs}
          toggleShareDialog={this.toggleShareDialog}
        />
        <PostSetBox
          owned={owned}
          postSets={postSets.get('data')}
          streamName={streamName}
          handlePostSet={this.handlePostSet}
        />
        <CloseableDialog
          active={shareDialogVisible}
          onEscKeyDown={this.toggleShareDialog}
          onOverlayClick={this.toggleShareDialog}
          onClose={this.toggleShareDialog}
          title="Invite a new subscriber to Stream Name"
        >
          <InviteForm
            handleSubmit={this.sendInvite}
          />
        </CloseableDialog>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  postSet: makeSelectPostSet(),
  emailInvited: makeSelectEmailInvited(),
});

const mapDispatchToProps = {
  fetchStreamPostSets: fetchStreamPostSetsRequest,
  updatePostSet: updatePostSetRequest,
  inviteEmailToStream: inviteEmailToStreamRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCanAccount(PowerStreamLayout));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { browserHistory } from 'react-router';
import { find } from 'lodash';
import styled from 'styled-components';

import { getClassesByPage } from 'utils/permissionClass';

import CloseableDialog from 'elements/atm.CloseableDialog';
import MenuItem from 'elements/atm.MenuItem';
import Menu from 'elements/atm.Menu';
import withReactRouter from 'elements/hoc.withReactRouter';
import Loading from 'components/Loading';
import PostEditor from 'containers/PostEditor';

import {
  fetchPostSetsRequest,
  fetchPostSetRequest,
  removePostSetFromStreamRequest,
  replicatePostSetRequest,
} from 'containers/App/actions';
import {
  makeSelectPostSets,
  makeSelectPostSet,
} from 'containers/App/selectors';

import {
  makeSelectCurrentAccount,
} from 'containers/Main/selectors';

import {
  inviteEmailToStreamRequest,
} from '../actions';
import {
  makeSelectEmailInvited,
} from '../selectors';

import styles from './styles.scss';

import ErrorWrapper from './ErrorWrapper';
import Wrapper from './Wrapper';
import TabBar from './TabBar';
import PostSetBox from './PostSetBox';
import InviteForm from './InviteForm';

const ReactRouterMenuItem = withReactRouter(MenuItem);

const SidebarWrapper = styled.div`
  width: 177px;
  height: 100vh;
  position: fixed;
  border-right: 2px solid #DBDFE0;
  padding: 5px;
  padding-top: 15px;
`;

const ContentWrapper = styled.div`
  position: relative;
  float: right;
  width: calc(100% - 177px);
  height: 100%;
`;

class PowerStreamLayout extends Component {
  static propTypes = {
    hash: PropTypes.string,
    accountId: PropTypes.string,
    streamCategory: PropTypes.string,
    streamId: PropTypes.string,
    userAccount: PropTypes.object,
    postSets: ImmutablePropTypes.map,
    postSet: ImmutablePropTypes.map,
    emailInvited: ImmutablePropTypes.map,
    fetchPostSets: PropTypes.func,  // eslint-disable-line
    fetchPostSet: PropTypes.func,
    removePostSetFromStream: PropTypes.func,
    inviteEmailToStream: PropTypes.func,
    replicatePostSet: PropTypes.func,
    activeBrand: PropTypes.object,
  };

  state = {
    error: '',
    shareDialogVisible: false,
  };

  componentWillMount() {
    this.changeStreamLink(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.streamCategory !== nextProps.streamCategory ||
      this.props.streamId !== nextProps.streamId) {
      this.changeStreamLink(nextProps);
    }
/*
    if (this.props.postSet !== nextProps.postSet &&
      !nextProps.postSet.get('processing')) {
      if (nextProps.postSet.get('error')) {
        toastr.error('The post has NOT been updated.');
      } else {
        toastr.success('Success', 'The post has been updated successfully');
      }
    }
*/
    if (this.props.emailInvited !== nextProps.emailInvited &&
      !nextProps.emailInvited.get('processing')) {
      if (!nextProps.emailInvited.get('error')) {
        this.toggleShareDialog();
      }
    }
  }

  changeStreamLink({ hash, userAccount, accountId, streamCategory, streamId, fetchPostSets }) {
    let newStreamId = streamId;

    if (!streamId) {
      if (streamCategory === 'owned') {
        newStreamId = userAccount.account_streams[0].stream_id;
      } else {
        if (!userAccount.shared_streams || userAccount.shared_streams.length === 0) {
          this.setState({
            error: 'This brand does not have any current subscriptions to shared streams.',
          });
          return;
        }

        newStreamId = userAccount.shared_streams[0].stream_id;
      }
      this.setState({
        error: '',
      });

      browserHistory.push(`/account/${accountId}/shared_streams/${streamCategory}/${newStreamId}${hash}`);
    }

    fetchPostSets(newStreamId, { query_by: 'stream_id' });
  }

  handlePostSet = (removing, postSet) => {
    const { removePostSetFromStream, replicatePostSet, streamId, accountId, streamCategory } = this.props;
    if (removing) {
      removePostSetFromStream(postSet.toJS(), streamId);
    } else {
      replicatePostSet(
        `/account/${accountId}/shared_streams/${streamCategory}/${streamId}`,
        {
          account_id: accountId,
          post_set_id: postSet.get('post_set_id'),
        }
      );
    }
  }

  sendInvite = (email) => {
    const { inviteEmailToStream, accountId, streamId } = this.props;

    inviteEmailToStream({
      accountId,
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
      postSet,
      postSets,
      userAccount,
      activeBrand,
      accountId,
      streamCategory,
      streamId,
      hash,
    } = this.props;
    const {
      error,
      shareDialogVisible,
    } = this.state;

    const { permissions } = activeBrand.user_access;
    const permissionClasses = getClassesByPage(permissions, 'sharedStreams');

    if (error) {
      return (
        <Wrapper>
          <SidebarWrapper>
            <Menu style={{ margin: '0 auto', padding: '0', width: '150px' }} selectable>
              <ReactRouterMenuItem parentActive caption="Owned" activeClassName={styles.active} to={`/account/${this.props.accountId}/shared_streams/owned`} style={{ color: '#616669', fontWeight: '700', fontSize: '13px !important', width: '150px' }} />
              <ReactRouterMenuItem parentActive caption="Subscriptions" activeClassName={styles.active} to={`/account/${this.props.accountId}/shared_streams/subscriptions`} style={{ color: '#616669', fontWeight: '700', fontSize: '13px !important' }} />
            </Menu>
          </SidebarWrapper>
          <ContentWrapper>
            <ErrorWrapper>
              { error }
            </ErrorWrapper>
          </ContentWrapper>
        </Wrapper>
      );
    }

    const owned = streamCategory === 'owned';
    const streams = owned ?
      userAccount.account_streams : userAccount.shared_streams;

    const tabs = streams.map((s) => ({
      label: s.title,
      link: `/account/${accountId}/shared_streams/${streamCategory}/${s.stream_id}`,
    }));
    const currentStream = find(streams, { stream_id: streamId });
    const streamName = (currentStream || {}).title;

    const postsetId = hash.startsWith('#postset') ? hash.split('-')[1] : null;

    const sortedPostSets =
      postSets.getIn(['data', 'post_sets']) &&
      postSets.getIn(['data', 'post_sets'])
        .sortBy((ps) => -ps.get('creation_time'))
        .filter((p) => p.get('status') === '3');

    return (
      <Wrapper>
        <SidebarWrapper>
          <Menu style={{ margin: '0 auto', padding: '0', width: '150px' }} selectable>
            <ReactRouterMenuItem parentActive caption="Owned" activeClassName={styles.active} to={`/account/${this.props.accountId}/shared_streams/owned`} style={{ color: '#616669', fontWeight: '700', fontSize: '13px !important', width: '150px' }} />
            <ReactRouterMenuItem parentActive caption="Subscriptions" activeClassName={styles.active} to={`/account/${this.props.accountId}/shared_streams/subscriptions`} style={{ color: '#616669', fontWeight: '700', fontSize: '13px !important' }} />
          </Menu>
        </SidebarWrapper>
        <ContentWrapper>
          <TabBar
            owned={owned}
            tabs={tabs}
            toggleShareDialog={this.toggleShareDialog}
          />
          <PostSetBox
            owned={owned}
            postSet={postSet}
            postSets={sortedPostSets}
            streamName={streamName}
            fetchingPostSets={postSets.get('requesting')}
            fetchPostSet={this.props.fetchPostSet}
            handlePostSet={this.handlePostSet}
            permissionClasses={permissionClasses}
          />
          <CloseableDialog
            active={shareDialogVisible}
            onEscKeyDown={this.toggleShareDialog}
            onOverlayClick={this.toggleShareDialog}
            onClose={this.toggleShareDialog}
          >
            <span className={styles.inviteDialogTitle}>Invite a new subscriber. The email inserted must be associated with <br />the owner of a premium PowerPost account.</span>
            <InviteForm
              handleSubmit={this.sendInvite}
            />
          </CloseableDialog>
          { postsetId &&
            <PostEditor
              id={postsetId}
              accountId={accountId}
            />
          }
          {postSets.get('requesting') && <Loading />}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSets: makeSelectPostSets(),
  postSet: makeSelectPostSet(),
  emailInvited: makeSelectEmailInvited(),
  activeBrand: makeSelectCurrentAccount(),
});

const mapDispatchToProps = {
  fetchPostSets: fetchPostSetsRequest,
  fetchPostSet: fetchPostSetRequest,
  removePostSetFromStream: removePostSetFromStreamRequest,
  inviteEmailToStream: inviteEmailToStreamRequest,
  replicatePostSet: replicatePostSetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PowerStreamLayout);

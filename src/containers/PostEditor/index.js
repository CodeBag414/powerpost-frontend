/**
 * Post Editor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  fetchPostSetRequest,
} from '_common/actions';

import { fetchComments } from 'containers/PostEditor/actions';

// FIXME: Should be changed to UserCanPostEdit
import { UserCanPostSet } from 'config.routes/UserRoutePermissions';

import TabLink from 'elements/atm.TabLink';

import Wrapper from './Wrapper';
import GeneralInfo from './GeneralInfo';
import UserAssignment from './UserAssignment';
import Tags from './Tags';

class PostEdtior extends Component {

  static propTypes = {
    params: PropTypes.shape({
      account_id: PropTypes.string,
      postset_id: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
    getComments: PropTypes.func,
    fetchPostSet: PropTypes.func,
  };

  static defaultProps = {
  };

  componentWillMount() {
    const { params: { postset_id } } = this.props;
    this.props.getComments(postset_id);
    this.props.fetchPostSet({
      id: postset_id,
    });
  }

  render() {
    const { params, children } = this.props;
    return (
      <Wrapper>
        <div className="main">
          <GeneralInfo />
          <div>
            <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/content`} label="Content" />
            <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/channels`} label="Channels & Times" />
            <TabLink to={`/account/${params.account_id}/postset/${params.postset_id}/streams`} label="Shared Streams" />
          </div>
          {children}
        </div>
        <div style={{ width: '300px' }}>
          <UserAssignment />
          <Tags />
        </div>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getComments: (postSetId) => dispatch(fetchComments(postSetId)),
    fetchPostSet: (payload) => dispatch(fetchPostSetRequest(payload)),
  };
}

const mapStateToProps = createStructuredSelector({});

export default UserCanPostSet(connect(mapStateToProps, mapDispatchToProps)(PostEdtior));

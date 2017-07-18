/*
 * Social Feeds View
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import withReactRouter from 'elements/hoc.withReactRouter';
import PPMenuItem from 'elements/atm.MenuItem';

import {
    makeSelectAccountConnections,
} from 'containers/Main/selectors';

const ReactRouterMenuItem = withReactRouter(PPMenuItem);
const Sidebar = styled.div`
    width: 225px;
    padding-top: 20px;
    padding-bottom: 20px;
    position: fixed;
    height: calc(100vh - 60px);
    overflow-y: scroll;
    border-right: solid 2px #C8CED0;
    i {
      font-size: 20px;
      &:before {
          border: none !important;
          font-family: 'FontAwesome';
          content: '\f067' !important;
      }
      &.pinterest-icon-color {
        color: ${(props) => props.theme.pinterestColor} !important;
      }
      &.twitter-icon-color {
        color: ${(props) => props.theme.twitterColor} !important;
      }
      &.facebook-icon-color {
        color: ${(props) => props.theme.facebookColor} !important;
      }
      &.linkedin-icon-color {
        color: ${(props) => props.theme.linkedinColor} !important;
      }
   }
`;

const Content = styled.div`
    width: calc(100% - 225px);
    float: right;
`;

const SocialFeeds = ({ connections, params, location, children }) => (
  <div>
    <Sidebar>
      {
        connections &&
        connections.map((connection) =>
          connection.channel !== 'wordpress' &&
            <ReactRouterMenuItem
              key={connection.connection_id + Date.now()}
              caption={connection.display_name}
              title={connection.display_name}
              isSidebar
              icon={<i className={connection.channel_icon} />}
              to={`/account/${params.account_id}/social_feeds/feed/${connection.connection_id}`}
              selected={location.pathname.match(`/feed/${connection.connection_id}`) != null}
            />
        )
      }
    </Sidebar>
    <Content>
      {children}
      {!children && <div style={{ textAlign: 'center', marginTop: '50px' }}><p>{"Choose a connected social channel to view it's native feed here."}</p></div> }
    </Content>
  </div>
);

SocialFeeds.propTypes = {
  connections: PropTypes.array,
  params: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node,
};

export function mapDispatchToProps(/* dispatch */) {
  return {

  };
}

const mapStateToProps = createStructuredSelector({
  connections: makeSelectAccountConnections(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialFeeds);

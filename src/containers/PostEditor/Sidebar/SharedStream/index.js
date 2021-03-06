import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SmoothCollapse from 'react-smooth-collapse';
import Toggle from 'react-toggle';

import Heading from 'components/Heading';

import Wrapper from './Wrapper';
import InnerWrapper from './InnerWrapper';

class SharedStream extends Component {
  static propTypes = {
    accountStreamId: PropTypes.string,
    postSet: ImmutablePropTypes.map,
    updatePostSet: PropTypes.func,
    permissionClasses: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const sharedStreamEnabled = props.postSet.getIn(['details', 'stream_ids']).includes(props.accountStreamId);

    this.state = {
      sharedStreamEnabled,
      isExpanded: sharedStreamEnabled,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postSet.getIn(['details', 'post_set_id']) !== this.props.postSet.getIn(['details', 'post_set_id'])) {
      const sharedStreamEnabled = nextProps.postSet.getIn(['details', 'stream_ids']).includes(nextProps.accountStreamId);
      this.setState({
        sharedStreamEnabled,
        isExpanded: sharedStreamEnabled,
      });
    }
  }

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  toggleSharedStream = () => {
    const { accountStreamId, postSet, updatePostSet } = this.props;
    const { sharedStreamEnabled } = this.state;
    const postDetails = postSet.get('details').toJS();
    const streamIds = postSet.getIn(['details', 'stream_ids']).toJS();
    let newStreamIds;

    this.setState({
      sharedStreamEnabled: !sharedStreamEnabled,
    });

    if (sharedStreamEnabled) {
      newStreamIds = streamIds.filter((id) => (id !== accountStreamId));
    } else {
      newStreamIds = [...streamIds, accountStreamId];
    }

    updatePostSet({
      ...postDetails,
      id: postDetails.post_set_id,
      stream_ids: newStreamIds,
    });
  }

  render() {
    const { isExpanded, sharedStreamEnabled } = this.state;
    const { permissionClasses } = this.props;
    return (
      <Wrapper>
        <Heading
          title="Shared Stream"
          icon="list-alt"
          iconColor="#67C5E6"
          expand={this.expand}
          isExpanded={isExpanded}
        />
        <SmoothCollapse expanded={isExpanded}>
          <InnerWrapper className={permissionClasses.sharedStream}>
            <span className="toggle-label">Include this post in this brand&#39;s shared stream?</span>
            <Toggle
              checked={sharedStreamEnabled}
              icons={false}
              onChange={this.toggleSharedStream}
            />
          </InnerWrapper>
        </SmoothCollapse>
        <div style={{ marginTop: '-16px' }} />
      </Wrapper>
    );
  }
}

export default SharedStream;

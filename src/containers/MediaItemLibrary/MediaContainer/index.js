import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Wrapper from './Wrapper';
import MediaItem from './MediaItem';
import ProcessingItem from './ProcessingItem';
import Loading from 'components/Loading';

import {
  makeSelectVisibleMediaItemsWithSearch,
  makeSelectProcessingItem,
  makeSelectFilter,
  makeSelectSortOrder,
  makeSelectIsFetching,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  visibleMediaItems: makeSelectVisibleMediaItemsWithSearch(),
  processingItem: makeSelectProcessingItem(),
  filter: makeSelectFilter(),
  sortOrder: makeSelectSortOrder(),
  isFetching: makeSelectIsFetching(),
});

class VisibleMediaContainer extends Component {
  render() {
    return (
      <Wrapper className="row">
        { this.props.isFetching && <Loading opacity={0.5} showIndicator={true} /> }
        { !this.props.visibleMediaItems.length && !this.props.isFetching && <span style={{ padding: '20px' }}>There are no media items available yet.</span> }
        { this.props.processingItem && <ProcessingItem />}
        { !this.props.isFetching && this.props.visibleMediaItems && this.props.visibleMediaItems.map((item, i) => <MediaItem key={i} mediaItem={item} query={this.props.query} createPostSet={this.props.createPostSet} onDelete={this.props.onConfirmDelete} openPreview={this.props.openPreview} openEditor={this.props.openEditor} />)}
      </Wrapper>
    );
  }
}

export default connect(mapStateToProps)(VisibleMediaContainer);

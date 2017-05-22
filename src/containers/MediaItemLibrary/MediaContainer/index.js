import { connect } from 'react-redux';
import MediaContainer from './MediaContainer';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectVisibleMediaItemsWithSearch,
  makeSelectMediaItemsSorted,
  makeSelectProcessingItem,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  mediaItems: makeSelectMediaItemsSorted(),
  visibleMediaItems: makeSelectVisibleMediaItemsWithSearch(),
  processingItem: makeSelectProcessingItem(),
});

const VisibleMediaContainer = connect(
  mapStateToProps)(MediaContainer);
  
export default VisibleMediaContainer;

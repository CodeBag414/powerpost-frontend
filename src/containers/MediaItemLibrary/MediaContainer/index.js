import { connect } from 'react-redux';
import MediaContainer from './MediaContainer';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectVisibleMediaItemsWithSearch,
  makeSelectMediaItems,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  mediaItems: makeSelectMediaItems(),
  visibleMediaItems: makeSelectVisibleMediaItemsWithSearch(),
});

const VisibleMediaContainer = connect(
  mapStateToProps)(MediaContainer);
  
export default VisibleMediaContainer;

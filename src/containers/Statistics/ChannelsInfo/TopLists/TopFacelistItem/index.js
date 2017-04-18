import React, { PropTypes } from 'react';
import { getFormattedDate, getCurrentMonth } from 'utils/timeUtils';

import ListWrapper from '../../Wrapper/ListWrapper';
import ImgWrapper from '../../Wrapper/ImgWrapper';
import TxtWrapper from '../../Wrapper/TxtWrapper';
import TableWrapper from '../../Wrapper/TableWrapper';

class TopFaceListItem extends React.Component {

  static propTypes = {
    topTweet: PropTypes.shape(),
    likes: PropTypes.string,
    comments: PropTypes.string,
    posts: PropTypes.string,
  }

  renderItem(topItem) {
    return (
      <div className={['col-md-7', 'col-lg-7', 'col-sm-7', 'col-xs-7'].join(' ')}>
        <div className={['col-md-2', 'col-sm-2', 'col-xs-2'].join(' ')}>
          <ImgWrapper>
            <img src={topItem.picture} role="presentation" />
          </ImgWrapper>
        </div>
        <div className={['col-md-10', 'col-sm-10', 'col-xs-1'].join(' ')}>
          <TxtWrapper>
            <p><b>{getFormattedDate(this.props.topTweet.created_time)}</b></p>
            <p>{ topItem.description }</p>
          </TxtWrapper>
        </div>
      </div>
    );
  }

  renderItemInfo() {
    const { likes, comments, posts } = this.props;
    return (
      <div className={['col-md-5', 'col-lg-5', 'col-sm-5', 'col-xs-5'].join(' ')}>
        <TableWrapper>
          <table>
            <tbody className="lsitItem" >
              <th className="borderRight" ><h3>{likes}</h3>Likes</th>
              <th className="borderRight" ><h3>{comments}</h3>Comments</th>
              <th><h3>{posts}</h3>Posts</th>
            </tbody>
          </table>
        </TableWrapper>
      </div>
    );
  }

  render() {
    const topItem = this.props.topTweet;
    if (topItem.month === getCurrentMonth()) {
      return (
        <ListWrapper>
          {this.renderItem(topItem)}
          {this.renderItemInfo()}
        </ListWrapper>
      );
    }
    return null;
  }
}

export default TopFaceListItem;

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Wrapper from './Wrapper';
import Item from './Item';
import HeaderWrapper from '../HeaderWrapper';
import GoTo from '../GoTo';

function Posts({ posts }) {
  return (
    <Wrapper>
      <HeaderWrapper>
        <div className="title">Posts</div>
        <div className="description">Go here to quickly edit, review and approve posts.</div>
      </HeaderWrapper>
      <table>
        <tr className="header">
          <th className="posts">Latest Posts</th>
          <th className="date">Date</th>
          <th className="status">Status</th>
        </tr>
        { posts && posts.count() > 0 &&
          posts.map((post) => <Item post={post} />)
        }
      </table>
      <div className="bottom-wrapper">
        <GoTo style={{ color: '#616669', float: 'right' }}>
          <span>View All</span><i className="fa fa-chevron-right" />
        </GoTo>
      </div>
    </Wrapper>
  );
}

Posts.propTypes = {
  posts: ImmutablePropTypes.list,
};

export default Posts;

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Wrapper from './Wrapper';
import ListWrapper from './ListWrapper';
import Item from './Item';
import HeaderWrapper from '../HeaderWrapper';
import GoTo from '../GoTo';

function Calendar({ posts }) {
  return (
    <Wrapper>
      <HeaderWrapper>
        <div className="title">Calendar</div>
        <div className="description">Go here to get a snapshot of your brand's upcoming posts and plan out your content.</div>
      </HeaderWrapper>
      <ListWrapper>
        <table>
          <tr className="header">
            <th className="preview" colSpan={2}>Preview</th>
            <th className="date">Date</th>
            <th className="channel">Channels</th>
          </tr>
          {posts && posts.count() > 0 &&
            posts.map((post) => <Item post={post} />)
          }
        </table>
        <div className="bottom-wrapper">
          <GoTo style={{ color: '#E35A88' }}>
            <span>View All</span><i className="fa fa-chevron-right" />
          </GoTo>
        </div>
      </ListWrapper>
    </Wrapper>
  );
}

Calendar.propTypes = {
  posts: ImmutablePropTypes.list,
};

export default Calendar;

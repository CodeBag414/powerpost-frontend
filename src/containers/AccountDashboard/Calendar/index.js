import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Card from '../Card';

import Wrapper from './Wrapper';
import Item from './Item';

function Calendar({ posts, path }) {
  return (
    <Card
      title="Calendar"
      description="Upcoming scheduled posts."
      link={path}
    >
      <Wrapper>
        {posts && posts.count() > 0 &&
        <table>
          <tr className="header">
            <th className="preview" colSpan={2}>Preview</th>
            <th className="date">Date</th>
          </tr>
          {posts.map((post) => <Item post={post} />)}
        </table>
        }
        {posts.count() === 0 && <div className="error">No upcoming posts available!</div>}
      </Wrapper>
    </Card>
  );
}

Calendar.propTypes = {
  posts: ImmutablePropTypes.list,
  path: PropTypes.string,
};

export default Calendar;

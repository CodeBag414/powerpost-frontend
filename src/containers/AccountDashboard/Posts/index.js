import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Card from '../Card';

import Section from './Section';
import Wrapper from './Wrapper';
import Item from './Item';

function Posts({ reviewPosts, draftPosts, path }) {
  return (
    <Card
      title="Posts"
      description="Content in progress."
      link={path}
    >
      <Wrapper>
        <Section status="review">
          {reviewPosts && reviewPosts.count() > 0 &&
            reviewPosts.map((post) => <Item post={post} />)
          }
        </Section>
        <Section status="draft">
          {draftPosts && draftPosts.count() > 0 &&
            draftPosts.map((post) => <Item post={post} />)
          }
        </Section>
      </Wrapper>
    </Card>
  );
}

Posts.propTypes = {
  reviewPosts: ImmutablePropTypes.list,
  draftPosts: ImmutablePropTypes.list,
  path: PropTypes.string,
};

export default Posts;

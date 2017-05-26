import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 40%;
  height: 100%;
  float: left;
  overflow-y: auto;
`;

const PostSetList = ({ postSets }) => (
  <Wrapper>
    {
      postSets.map((p) => (
        <div key={p.get('post_set_id')} className="postset-item">
          { p.get('title') }
          { p.get('message') }
        </div>
      ))
    }
  </Wrapper>
);

PostSetList.propTypes = {
  postSets: ImmutablePropTypes.list,
};

export default PostSetList;

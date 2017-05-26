import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  float: left;
`;

const PostSetDetail = ({
  owned,
  postSet,
}) => (
  <Wrapper>
    { postSet.get('title') }
    created by { postSet.get('user_id') }
  </Wrapper>
);

PostSetDetail.propTypes = {
  postSet: ImmutablePropTypes.map,
};

PostSetDetail.defaultProps = {
  postSet: new Map(),
};

export default PostSetDetail;

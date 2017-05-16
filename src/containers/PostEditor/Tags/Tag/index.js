import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import CloseButtonWrapper from './CloseButtonWrapper';

function Tag({ remove, tag }) {
  return (
    <Wrapper>
      <span className="title">{tag.value}</span>
      <CloseButtonWrapper onClick={() => remove(tag.id)}>x</CloseButtonWrapper>
    </Wrapper>
  );
}

Tag.propTypes = {
  remove: PropTypes.func,
  tag: PropTypes.shape(),
};

export default Tag;

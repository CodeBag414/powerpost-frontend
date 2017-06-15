import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Wrapper from './Wrapper';
import LimitIndicator from './LimitIndicator';

const Span = styled.div`
  display: inline-block;
  height: 100%;
  line-height: 40px;
  font-size: 12px;
  font-weight: 700;
  font-family: Lato;
  color: #8C9496;
  vertical-align: top;
  margin-right: 7px;
`;

function MessageToolbar({ characterLimit }) {
  return (
    <Wrapper>
      <Span>Post Message</Span>
      <Span>|</Span>
      <LimitIndicator className={characterLimit < 0 && 'negative'}>{characterLimit}</LimitIndicator>
    </Wrapper>
  );
}

MessageToolbar.propTypes = {
  characterLimit: PropTypes.number,
};

export default MessageToolbar;

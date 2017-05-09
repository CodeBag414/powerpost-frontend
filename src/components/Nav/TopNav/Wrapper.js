import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position:fixed;
  top: 0;
  height: 61px;
  left: 0;
  transition: transform .3s ease-in-out, width .3s ease-in-out;
  box-shadow: 0 1px 5px 0 rgba(60,92,129,0.20);
  background-color: #fff;
  width: ${(props) => props.isNotFullWidth ? 'calc(100% - 60px)' : '100%'};
`;

export default Wrapper;
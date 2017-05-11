import React from 'react';
import styled from 'styled-components';

const Avatar = styled.div`
  background-image: url(${(props) => props.avatarSrc});
  background-size: cover;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  border-radius: 4px;
`;

export default Avatar;

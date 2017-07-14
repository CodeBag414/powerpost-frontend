import styled from 'styled-components';

import { MAX_WIDTH } from './constants';

const Image = styled.div`
  background-image: url(${(props) => props.url});
  background-position: ${(props) => props.width < MAX_WIDTH ? 'inherit' : 'center'};
  background-repeat: no-repeat;
  background-size: ${(props) => props.width < MAX_WIDTH ? '138px' : 'cover'};
  display: ${(props) => props.width < MAX_WIDTH ? 'inline-block' : 'block'};
  height: ${(props) => props.width < MAX_WIDTH ? 72 : 250}px;
  overflow: hidden;
  vertical-align: middle;
  width: ${(props) => props.width < MAX_WIDTH ? '138px' : 'inherit'};

  img {
    display: none;
  }
`;

export default Image;

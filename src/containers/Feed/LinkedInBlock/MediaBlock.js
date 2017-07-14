import styled from 'styled-components';

import { MAX_WIDTH } from './constants';

const MediaBlock = styled.div`
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
  margin-top: 8px;
  padding: ${(props) => props.width < MAX_WIDTH ? 8 : 0}px;
  width: 100%;
`;

export default MediaBlock;

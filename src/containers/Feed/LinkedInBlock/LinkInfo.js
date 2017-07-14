import styled from 'styled-components';

import { MAX_WIDTH } from './constants';

const LinkInfo = styled.div`
  border-top: ${(props) => props.width < MAX_WIDTH ? 'none' : '1px solid #e6e9ec'};
  display: ${(props) => props.width < MAX_WIDTH ? 'inline-block' : 'block'};
  padding: ${(props) => props.width < MAX_WIDTH ? '0 0 0 8px' : '8px 12px'};
  vertical-align: middle;

  .link-title {
    color: rgba(0,0,0,.85);
    font-size: 15px;
    font-weight: bold;
    margin: 0;
  }

  .link-desc {
    color: rgba(0,0,0,.55);
    font-size: 13px;
    margin: 0;
  }
`;

export default LinkInfo;

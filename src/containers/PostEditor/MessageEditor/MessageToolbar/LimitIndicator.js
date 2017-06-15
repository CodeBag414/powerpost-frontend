import styled from 'styled-components';

const LimitIndicator = styled.span`
  display: inline-block;
  height: 100%;
  line-height: 40px;
  font-size: 12px;
  font-weight: 700;
  font-family: Lato;
  color: #8C9496;
  vertical-align: top;
  &.negative {
    color: #e81c64;
  }
`;

export default LimitIndicator;

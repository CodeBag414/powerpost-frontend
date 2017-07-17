import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  font-family: $brandFont;
  width: 100%;
  height: 100%;
  .disabled {
    pointer-events: none;
    position: relative;
    &::after {
      position: absolute;
      content: ' ';
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.05);
      z-index: 10000;
    }
  }
  .hidden {
    display: none;
  }
`;

export default Wrapper;

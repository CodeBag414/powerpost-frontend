import styled, { keyframes } from 'styled-components';

const slide = keyframes`
   0% {
    background-position: 0% 0;
  }
  100% {
    background-position: -1000% 0;
  } 
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 0.4rem
  top: 0;
  z-index: 999999999;
}
`;

export default Wrapper;

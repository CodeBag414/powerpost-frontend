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
  height: 30px;
  background-color: blue;
  width: 200px;
  top: 0;
  font-weight: 700;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.75);
  z-index: 99999;
  left: 45%;
  text-align: center;
  line-height: 30px;
  color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: lightBlue;
  background-image: repeating-linear-gradient(125deg, lightBlue 0px, lightBlue 8px, #3a9fc0 8px, #3a9fc0 16px);
  background-position: 50% 0;
  background-size: 20px 100%;
  animation: ${slide} 20s 9999 linear;
  border: 1px #3a9fc0 solid; 
  border-top: 0px;
  box-shadow: inset 0 0.2em 1em -0.2em white, inset 0 -0.2em 1em -0.2em rgba(0, 0, 0, 0.75), 0 0.3em 0.7em 0 rgba(0, 0, 0, 0.5);

}
`;

export default Wrapper;

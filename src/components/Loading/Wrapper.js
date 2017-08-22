import styled from 'styled-components';

export default styled.div`
  position: absolute;
  z-index: ${({ zIndex }) => zIndex};
  background-color: ${({ opacity }) => `rgba(255, 255, 255, ${opacity})`};
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

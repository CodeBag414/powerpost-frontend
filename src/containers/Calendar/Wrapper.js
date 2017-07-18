import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  font-family: Lato;
  &.disabled {
    opacity: 0.9;
    pointer-events: none;
  }
`;

export default Wrapper;

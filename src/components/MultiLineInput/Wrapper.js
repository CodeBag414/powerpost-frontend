import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  &.disabled {
    z-index: 0;
  }
`;

export default Wrapper;

import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  &.hasBorder {
    border-radius: 4px;
    border: 1px solid #CFD8DC !important;
  }

  .suggestion-item {
    display: flex;

    img {
      height: 32px;
      margin-right: 12px;
      width: 32px;
    }
  }
`;

export default Wrapper;

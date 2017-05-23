import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  font-family: Lato;
  .post-editor {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: white;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 10;
  }
  &.modal-open {
    overflow: hidden;
    .post-editor {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

export default Wrapper;

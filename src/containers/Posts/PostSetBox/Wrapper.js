import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  .post-list-container {
    width: 40%;
    max-width: 350px;
    height: 100%;
    float: left;
    display: flex;
    flex-direction: column;
    .status-selector {
      display: flex;
      padding: 10px;
      .status-item {
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: 3px;
        margin: 5px;
        border-radius: 3px;
        color: white;
        transition: color 0.5s, background-color 0.5s;
        &:not(.active-status) {
          background-color: white !important;
          color: black;
        }
      }
    }
  }
  .post-editor-container {
    flex: 1;
    position: relative;
  }
`;

export default Wrapper;

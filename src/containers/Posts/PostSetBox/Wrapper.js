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
    max-width: 300px;
    height: 100%;
    float: left;
    display: flex;
    flex-direction: column;
    .status-selector {
      display: flex;
      padding: 10px 5px;
      font-size: 14px;
      .status-item {
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: 3px 0;
        margin: 3px;
        border-radius: 3px;
        color: white;
        transition: color 0.5s, background-color 0.5s;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        &:not(.active-status) {
          background-color: white !important;
          color: black;
        }
        .status-size {
          font-size: 10px;
          padding: 2px;
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

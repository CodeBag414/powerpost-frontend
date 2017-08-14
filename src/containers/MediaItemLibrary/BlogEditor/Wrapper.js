import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 99999999;
  background: #fff;

  .content-wrapper {
    padding: 0 20px 0 0;
    display: flex;
    height: 100%;
    .main {
      flex: 2;
      .note-editor.note-frame.panel.panel-default {
        border: none;
        box-shadow: none;
      }
    }
    .right-pane {
      flex: 1;
      border-left: 1px solid #DBDFE0;
      padding-left: 20px;

      .button-wrapper {
        display: flex;
        justify-content: space-between;
        margin: 20px auto;
      }

      .image-wrapper {
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            margin: 0;
            padding: 0;
          }
        }
        .cover-image {
          margin: 20px;
        }
      }
    }
  }
`;

export default Wrapper;

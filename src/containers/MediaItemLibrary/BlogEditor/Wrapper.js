import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10001;
  background: #fff;

  .content-wrapper {
    padding: 0 20px;
    display: flex;
    height: 100%;
    .main {
      flex: 2;
    }
    .right-pane {
      flex: 1;
      border-left: 1px solid #DBDFE0;
      padding: 20px 0 0 20px;
    }
  }
`;

export default Wrapper;

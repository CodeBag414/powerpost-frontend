import styled from 'styled-components';

const Wrapper = styled.div`
  position: ${({ modal }) => modal ? 'fixed' : 'absolute'};
  left: 0; top: 0; bottom: 0; right: 0;
  display: flex;
  flex-direction: column;
  background: white;
  z-index: ${({ modal }) => modal ? '1000000' : '10000'};
  .active-link {
    a {
      color: #424647 !important;
      border-top: 2px solid #E81C64;
      border-left: 1px solid #DBDFE0;
      border-right: 1px solid #DBDFE0;
      border-bottom: 1px solid #fff !important;
      span {
        display: none;
      }
    }
  }
  a {
    transition: border-bottom 0.3s, color 0.3s;
    cursor: pointer;
  }
  .content-wrapper {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .content {
    position: relative;
    min-height: 100%;
  }
  .main {
    flex: 1;
    /*margin-right: 258px;*/
    overflow-x: auto;
    overflow-y: hidden;
    padding: 40px;
  }
`;

export default Wrapper;

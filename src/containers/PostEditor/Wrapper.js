import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px;
  .active-link {
    a {
      color: #424647 !important;
      border-top: 2px solid #E81C64;
      border-left: 1px solid #DBDFE0;
      border-right: 1px solid #DBDFE0;
      border-bottom: 1px solid transparent !important;
      span {
        display: none;
      }
    }
  }
  a {
    transition: border-bottom 0.3s, color 0.3s;
    cursor: pointer;
    
  }
  .back-button {
    font-size: 20px;
    position: absolute;
    top: 10px;
    cursor: pointer;
  }
`;

export default Wrapper;

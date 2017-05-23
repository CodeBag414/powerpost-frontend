import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px;
  .active-link {
    a {
      border-bottom: 2px solid #E52466;
      color: #4A4A4A !important;
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

import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Lato;
  width: 227px;
  margin-right: 30px;
  margin-top: 30px;
  .header {
    border-bottom: 0.85px solid #DBDFE0;
    display: flex;
    padding-left: 10px;
    padding-bottom: 10px;
    i {
      font-size: 20px;
    }
    .fa-check-square-o {
      color: #B171B5;
    }
    .fa-pencil {
      color: #67C5E6;
    }
    span {
      color: #616669;
      font-size: 13px;
      font-weight: 500;
      margin-left: 15px;
    }
  }
`;

export default Wrapper;

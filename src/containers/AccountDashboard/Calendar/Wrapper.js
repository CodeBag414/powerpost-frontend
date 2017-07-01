import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #FFFFFF;
  margin-top: 20px;

  table {
    width: 100%;
    font-family: Lato;
    tr {
      border-bottom: 1.2px solid #DBDFE0;
      height: 60px;
      th {
        color: #888888;
        font-size: 11px;
        font-weight: 500;
      }
      th.preview {
        padding-left: 6px;
      }
      th.date {
      }
    }
    tr.header {
      height: 30px;
      line-height: 30px;
    }
  }
`;

export default Wrapper;

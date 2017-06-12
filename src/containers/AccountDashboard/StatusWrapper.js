import styled from 'styled-components';

const StatusWrapper = styled.div`
  display: flex;
  font-family: Lato;
  color: #616669;
  margin-bottom: 35px;

  .item {
    font-size: 13px;
    font-weight: 900;
    margin-right: 30px;
    span {
      text-decoration: underline;
      padding-left: 5px;
      font-weight: 500;
    }
  }
`;

export default StatusWrapper;


import styled from 'styled-components';

const UpcomingWrapper = styled.div`
  display: flex;
  font-family: Lato;
  color: #616669;
  margin-bottom: 20px;
  .caption {
    padding-right: 30px;
    font-size: 14px;
  }
  .content {
    flex: 1;
    
    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      padding-right: 15px;
      .title {
        flex: 1;
        font-size: 12px;
        font-weight: bold;
        text-decoration: underline;
      }
      .time {
        font-size: 11px;
        font-weight: 500;
      }
    }
  }
`;

export default UpcomingWrapper;


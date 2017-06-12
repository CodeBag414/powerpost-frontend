import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: flex;
  font-family: Lato;
  color: #616669;
  margin-bottom: 20px;

  .caption {
    font-size: 14px;
  }
  .content {
    margin-left: 30px;
    flex: 1;
    .item {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      i {
        font-size: 14px;
      }
      div {
        flex: 1;
        padding-left: 10px;
        text-decoration: underline;
        font-size: 12px;
      }
    }
  }
`;

export default ContentWrapper;


import styled from 'styled-components';

const BodyWrapper = styled.div`
  display: flex;
  font-family: Lato;
  .info-wrapper {
    flex: 3;
    padding-right: 20px;
  }
  .image-wrapper {
    flex: 2;
    padding-left: 20px;
    .header {
      display: flex;
      justify-content: space-between;
      p {
        height: 15px;
        color: #8C9496;
        font-weight: bold;
        line-height: 15px;
        font-size: 12px;
      }
    }
    .cover-image {
      border: 1px solid #8C9496;
      border-radius: 3px;
      height: 120px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
`;

export default BodyWrapper;

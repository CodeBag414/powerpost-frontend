import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px 40px 24px 40px;
  width: 440px;

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      color: #6F6F6F;
      font-size: 20px;
      line-height: 24px;
    }
    .close-button {
      color: #888888;
      font-size: 24px;
      line-height: 27px;
      cursor: pointer;
    }
  }

  .instruction {
    color: #8C9496;
    font-size: 12px;
    line-height: 15px;
    margin-top: 11px;
  }

  .post-on-ready {
    color: #616669;
    font-size: 12px;
    line-height: 15px;
    text-decoration: underline;
    margin-top: 11px;
  }
`;

export default Wrapper;

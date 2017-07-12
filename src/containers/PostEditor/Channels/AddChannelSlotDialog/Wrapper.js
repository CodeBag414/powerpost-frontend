import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 32px 0 24px;
  margin: auto;
  width: 700px;
  max-width: 100%;
  border-radius: 4px;
  position: relative;

  .close-button {
    position: absolute;
    top: 30px;
    right: 20px;
    color: #888888;
    font-size: 18px;
    cursor: pointer;
  }

  .top-area {
    padding: 0 40px;
    display: flex;
    max-height: calc(80vh - 130px);
    overflow-y: auto;
    .left-box {
      flex: 5;
      margin-right: 20px;
    }
    .right-box {
      flex: 6;
    }
  }
  .title {
    color: #6F6F6F;
    font-size: 20px;
    line-height: 24px;
  }
  .sub-title {
    margin: 5px 0 30px;
    font-size: 12px;
    color: #8C9496;
    line-height: 15px;
  }

  .post-style {
    margin: 5px 0 33px;
    width: 170px;
    height: 36px;
    background-color: #E7ECEE;
    border: 1px solid #C8CED0;
    border-radius: 4px;
    color: #616669;
    font-size: 12px;
    line-height: 36px;
    cursor: pointer;
    text-align: center;
  }
  .placeholder-message {
    color: #8C9496;
    font-size: 18px;
    font-style: italic;
    line-height: 23px;
  }

  .schedules-block {
    margin-top: 5px;
  }

  .btn-wrapper {
    margin-top: 30px;
    padding: 0 40px;
    .schedule-selected-channels {
      width: 100%;
    }
  }
`;

export default Wrapper;

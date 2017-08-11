import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Lato;
  padding-top: 40px;
  min-width: 900px;

  .schedule-button-row {
    margin-bottom: 20px;
    padding-right: 29px;
  }
  .title {
    color: #6F6F6F;
    display: inline-block;
    font-size: 17px;
    line-height: 36px;
    vertical-align: middle;
  }
  .add-button {
    margin-left: 30px;
    color: #ffffff;
    padding: 0 20px;
    .button-plus {
      font-size: 19px;
      margin-right: 14px;
      vertical-align: middle;
    }
    .button-title {
      font-size: 12px;
      vertical-align: middle;
    }
  }

  .columns {
    display: flex;
    margin-top: 60px;
  }

  .left {
    padding-bottom: 50px;
    position: relative;
    width: 56%;
  }
  .sort-by-header {
    color: #b8b8b8;
    font-weight: 500;
    position: absolute;
    right: 10px;
    top: -35px;
  }

  .right {
    padding-left: 40px;
    width: 44%;
  }
  .post-preview-title {
    color: #6f6f6f;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export default Wrapper;

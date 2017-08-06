import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  font-family: Lato;
  padding-top: 40px;
  min-width: 900px;

  .left {
    border-right: 3px solid #DBDFE0;
    margin-top: -118px;
    padding-bottom: 50px;
    padding-top: 118px;
    width: 60%;
  }
  .schedule-button-row {
    display: flex;
    justify-content: space-between;
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

  .right {
    padding-left: 40px;
    width: 40%;
  }
  .post-preview-title {
    color: #6f6f6f;
    font-size: 17px;
    margin-bottom: 25px;
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

import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 40px;
  position: relative;
  display: flex;
  width: 100%;
  .title {
    color: #888888;
    display: inline-block;
    font-size: 16px;
    line-height: 19px;
    vertical-align: middle;
  }
  .add-button {
    margin-left: 30px;
    color: #ffffff;
    padding: 0 20px;
    .button-plus {
      font-size: 19px;
      margin-right: 6px;
      vertical-align: middle;
    }
    .button-title {
      font-size: 12px;
      vertical-align: middle;
    }
  }
  .content {
    margin-top: 35px;
  }

  .right {
    margin-left: 16px;
    border-left: 1.1px solid #DBDFE0;
    padding-left: 23px;
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

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  .left-column {
    width: 450px;
  }

  .right-column {
    margin-left: 46px;
  }

  .section-title {
    color: #616669;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 13px;
    &.modify-content {
      margin-top: 10px;
    }
    &.schedule {
      margin-top: 10px;
    }
  }

  .date-pickers {
    .time-picker {
      margin-top: 13px;
      width: 100px;
    }
  }

  .post-upon-ready-placeholder {
    color: #616669;
  }

  button {
    margin-top: 13px;
    margin-left: -6px;
    height: 32px;
    color: #8C9496 !important;
    font-family: Lato;
    font-size: 12px;
    font-weight: bold;
    line-height: 15px;
    border: none;
  }
`;

export default Wrapper;

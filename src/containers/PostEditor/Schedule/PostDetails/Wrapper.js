import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Lato;
  max-width: 450px;

  .section-title {
    color: #616669;
    font-size: 14px;
    font-weight: bold;
    line-height: 17px;
    margin-bottom: 13px;
    &.schedule {
      margin-top: 30px;
    }
  }

  .schedule-content {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .date-pickers {
      .date-picker {
        display: inline-block;
        width: 140px;
      }
      .time-picker {
        display: inline-block;
        margin-left: 8px;
        width: 100px;
      }
    }
    i {
      cursor: pointer;
      font-size: 18px;
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
    font-size: 12px;
    font-weight: bold;
    line-height: 15px;
    border: none;
  }
`;

export default Wrapper;

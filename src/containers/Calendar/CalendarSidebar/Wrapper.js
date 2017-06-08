import styled from 'styled-components';

const Wrapper = styled.div`
  width: 224px;
  height: 100%;
  background: #fff;
  padding: 25px 20px;
  overflow-y: auto;

  .cal-sidebar-title {
    color: #616669;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 20px;
  }

  .cal-sidebar-search {
    font-size: 12px;
    font-family: Lato;
    position: relative;
    margin-bottom: 24px;
    input {
      padding: 6px 24px 6px 9px;
      border: 1px solid #C8CED0;
      border-radius: 4px;
      width: 100%;
    }
    i {
      color: #8C9496;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  .cal-sidebar-statuses {
    margin-bottom: 33px;
    .cal-sidebar-checkbox {
      margin-bottom: 13px;
      > div {
        width: 14px;
        height: 14px;
        &::after {
          transform: scale(0.8) rotate(45deg) !important;
          margin-left: -0.2rem;
          margin-top: -0.1rem;
        }
      }
      > span {
        color: #616669;
        font-size: 13px;
        font-weight: normal;
        line-height: 14px;
        padding-left: 16px;
      }
    }
    .showReady > div {
      background-color: #ABE66A;
      border-color: #ABE66A;
    }
    .showReview > div {
      background-color: #B171B5;
      border-color: #B171B5;
    }
    .showDraft > div {
      background-color: #67C5E6;
      border-color: #67C5E6;
    }
    .showIdea > div {
      background-color: #ACB5B8;
      border-color: #ACB5B8;
    }
  }

  .cal-sidebar-unscheduled {
    .cal-sidebar-unscheduled-item {
      padding: 0 20px;
      margin: 0 -20px;
      color: #616669;
      font-size: 12px;
      font-weight: bold;
      line-height: 28px;
      height: 28px;
      position: relative;
      cursor: pointer;
      .fa-ellipsis-h {
        visibility: hidden;
        font-size: 15px;
        float: right;
        padding: 4px;
        cursor: pointer;
      }
      &:hover, &.active {
        background-color: #F9FAFA;
        i {
          visibility: visible;
        }
      }
    }
  }
`;

export default Wrapper;

import styled from 'styled-components';

const Wrapper = styled.div`
  border-bottom: 1px solid #d6d6d6;
  border-left: 1px solid #d6d6d6;
  border-right: 1px solid #d6d6d6;

  .slot-timestamp {
    border-top: 1px solid #d6d6d6;
    display: flex;
    font-size: 12px;
    padding: 20px 40px;
    position: relative;

    &:hover, &.active {
      background-color: #F3F8Fa;
    }

    .connection-info {
      max-width: 90px;
      min-width: 90px;
      i {
        font-size: 28px;
        margin-right: 8px;
      }
      .connection-type {
        color: #999;
        text-transform: uppercase;
      }
      .connection-name {
        color: #999;
        font-weight: bold;
        margin-top: 8px;
      }
    }

    .date-time {
      color: #777;
      margin-left: 40px;
      min-width: 90px;
      .date-row {
        font-size: 14px;
        font-weight: bold;
      }
      .time-row {
        margin-top: 8px;
        text-transform: uppercase;
      }
    }

    .message {
      color: #999;
      width: calc(100% - 250px);
      margin-left: 30px;
      .message-content {
        width: 100%;
        word-wrap: break-word;
      }
    }

    .deletePopover {
      color: #666;
      cursor: pointer;
      font-size: 16px;
      padding: 5px 10px;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`;

export default Wrapper;

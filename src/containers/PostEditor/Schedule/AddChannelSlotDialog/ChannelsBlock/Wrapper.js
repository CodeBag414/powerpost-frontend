import styled from 'styled-components';

const Wrapper = styled.div`
  .channels-heading {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;

    .instruction {
      color: #616669;
      font-size: 14px;
      line-height: 17px;
      margin: 0;
      margin-right: 25px;
    }
  }
  label[data-react-toolbox=checkbox] {
    margin: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    [data-react-toolbox=label] {
      color: #8C9496;
      font-size: 12px;
      line-height: 15px;
      font-weight: normal;
    }
    [data-react-toolbox=check] {
      border: 1px solid #C8CED0;
      border-radius: 2.25px;
      background-color: transparent;

      &:after {
        border-color: #E81C64;
      }
    }
    &.checked {
      [data-react-toolbox=check] {
        border-color: #E81C64;
      }
      [data-react-toolbox=label] {
        color: #E81C64;
        font-weight: bold;
        line-height: 16px;
      }
    }
    &.disabled {
      [data-react-toolbox=check] {
        opacity: 0.5;
      }
    }
  }
  .channel-wrapper {
    display: flex;
    align-items: center;
    padding: 2px 0;
    .content {
      margin-left: 16px;
      display: flex;
      align-items: center;
      .connection-icon {
        font-size: 25px;
      }
      .connection-description {
        margin-left: 12px;
        color: #616669;
        .display-name {
          font-size: 13px;
          line-height: 17px;
          font-weight: bold;
          color: #888888;
        }
        .type {
          font-size: 11px;
          line-height: 13px;
          margin-top: 4px;
        }
      }
    }
  }
  .facebook {
    color: #4867AA;
  }

  .linkedin {
    color: #0177B5;
  }

  .pinterest {
    color: #D50C22;
  }

  .twitter {
    color: #1DA1F2;
  }

  .wordpress {
    color: #464646;
  }
  .google {
    color: #d34836;
  }
`;

export default Wrapper;

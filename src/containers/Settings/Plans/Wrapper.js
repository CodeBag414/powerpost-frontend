import styled from 'styled-components';

import theme from 'theme';

const { textColor, textColorDark } = theme;

export default styled.div`
  color: ${textColor};

  .left-pane {
    max-width: 100%;
    width: 400px;
    display: inline-block;
    vertical-align: top;
    margin-right: 30px;

    .card {
      margin-bottom: 20px;
      padding: 15px 23px;
      position: relative;
    }
    .title-label {
      font-size: 1.8rem;
    }
    .title {
      font-size: 2.8rem;
      font-weight: bold;
      color: ${textColorDark};
    }
    .divider {
      margin: 5px 0 15px;
      height: 1px;
      background-color: ${textColor};
    }
    section {
      margin-bottom: 25px;
      .header {
        color: ${textColorDark};
        font-size: 1.3rem;
        font-weight: 500;
      }
      .value {
        font-size: 1.5rem;
        font-weight: 200;
      }
    }
    button {
      position: absolute;
      right: 20px;
      bottom: 35px;
    }
  }
  .right-pane {
    max-width: 100%;
    width: 650px;
    display: inline-block;
    vertical-align: top;

    .title {
      font-size: 1.8rem;
      margin: 13px 0 20px;
    }
    table {
      table-layout: fixed;
      width: 100%;
      tr {
        border-bottom: 1px solid ${textColor};
      }
      th, td {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 400;
      }
      th {
        padding: 8px 3px;
        &.date {
          width: 15%;
        }
        &.paid {
          width: 20%;
        }
        &.refunded {
          width: 25%;
        }
        &.method {
          width: 25%;
        }
        &.status {
          width: 15%;
        }
      }
      td {
        padding: 20px 3px;
      }
    }
  }
`;

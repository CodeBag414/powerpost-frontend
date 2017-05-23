import styled from 'styled-components';

const Wrapper = styled.div`
  width: 372px;
  .section-title {
    color: #616669;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 13px;
  }

  .date-pickers {
    display: flex;
    
    .date-picker {
      margin-right: 8px;
    }

    .time-picker {
      width: 100px;
    }
  }

  .modify-content {
    margin-top: 28px;
  }

  div[data-react-toolbox=input] {
    padding: 0;
    input {
      color: #616669;
      border: 1px solid #CFD8DC;
      border-radius: 4px;
      font-size: 13px;
      line-height: 14px;
      padding: 9px 12px;
    }
  }

  .channel-summary {
    margin-bottom: 15px;
    i {
      font-size: 32px;
      border-radius: 2px;
      vertical-align: middle;
      margin-right: 16px;
    }
    .facebook-icon-color {
      color: #4867AA;
    }
    .linkedin-icon-color {
      color: #0177B5;
    }
    .pinterest-icon-color {
      color: #D50C22;
    }
    .twitter-icon-color {
      color: #1DA1F2;
    }
    .wordpress-icon-color {
      color: #464646;
    }
    .google-icon-color {
      color: #d34836;
    }

    .summary-right {
      display: inline-block;
      vertical-align: middle;
    }
    .channel-name {
      color: #39579A;
      font-family: Lato;
      font-size: 11px;
      font-weight: bold;
      line-height: 13px;
      display: block;
      margin-bottom: -2px;
    }
    .timestamp {
      color: #8C9496;
      font-family: Lato;
      font-size: 10px;
      line-height: 12px;
    }
  }

  button {
    float: right;
    margin-top: -6px;
    height: 32px;
    text-align: left;
    color: #8C9496 !important;
    font-family: Lato;
    font-size: 12px;
    font-weight: bold;
    line-height: 15px;
    border: none;
  }
`;

export default Wrapper;

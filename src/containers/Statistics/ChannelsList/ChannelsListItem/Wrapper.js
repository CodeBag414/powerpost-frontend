import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px 5px 10px 10px;

  .connectionIcon {
    float:left;
    margin-right: 18px;
    margin-top: 3px;
    i {
      font-size: 26px;
    }
  }

  .connectionName {
    padding-right: 10px;
    font-size: 13px;
    color: #616669;
  }

  .connectionSubName {
    font-size: 11px;
  }

  .connectionType {
    padding-left: 5px;
  }

  .controlBlock {
    float: right;
    text-align: center;
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

  .clearBoth {
    clear: both;
  }

  .disabledLabel, .disconnectedLabel, .enabledLabel {
    border-radius: 8px;
    height: 40px;
    width: 120px;
    padding-top: 10px;
  }

  .disabledLabel {
    background-color: #AAB3B7;
    color: #FFFFFF;
  }

  .disconnectedLabel {
    background-color: #FFFFFF;
    color: #EC0057;
    border: 1px solid #EC0057;
  }

  .enabledLabel {
    background-color: #EC0057;
    color: #FFFFFF;
  }
`;

export default Wrapper;

import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #fdfefe;

    .basicInfo {
        height: 80px;
        background-color: white;
        display: block;
        position: relative;
        margin-top: 30px;
        margin-left: 10px;
        border-right: 0px;

        table {
          box-shadow: 0px 1px 6px #cccccc;
          border-radius: 3px;
          overflow: hidden;
        }
    }
    .channelsinfo{
        margin-top: 50px;
        color: rgb(136, 136, 136);
        h3 {
          font-weight: normal;
        }
    }
    .infoTab {
        border-bottom: 1px solid #777777;
    }
    .infoTabItem {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 13px;
        padding-bottom: 21px;
        display: inline-block;
        font-weight: 700;
        padding-top: 20px;
        font-family: 'Lato';
        font-size: 13px;
        color: #888888;
        letter-spacing: 0;
        line-height: 17px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;

        &:hover, &:active, &.darken {
            color: #4A4A4A;
            text-decoration: none;
        }

        &.activeBorderline {
            border-bottom: 2px solid #E52466;
            color: #4A4A4A !important;
        }
    }
    .topItemValue {
      margin-bottom: 2px;
    }
    .topItemLabel {
      margin-top: 0;
      margin-bottom: 25px;
      font-size: 11px;
    }
    .paddingleft {
        padding-left: 10px;
        color: #888888;
    }
    .tablewidth {
        width: 100%;
        height: 100%;
    }
    .borderright {
        border-right: 1px solid #dddddd;
    }
    th {
        text-align: center;
        color: #777777;
    }

    .activeWidth {
        width: 28%;
        border-right: 1px solid #dddddd;
    }

    .infoWidth {
        width: 18%;
        border-right: 1px solid #dddddd;
    }

    .connectionBlock {
        padding: 5px 5px 5px 10px;
        display: inline-block;
        margin: auto;
    }

    .connectionIcon {
        float:left;
        margin-right: 20px;
        i {
            font-size: 50px;
        }
    }

    .connectionName {
        padding-right: 10px;
        font-size: 25px;
        font-weight: regular;
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

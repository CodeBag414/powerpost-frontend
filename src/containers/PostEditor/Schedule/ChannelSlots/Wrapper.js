import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: -40px;

  .channel-slot {
  }

  .slot-header {
    background-color: #F9FAFA;
    border-top: 1px solid #CFD8DC;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-top: 10px;

    i {
      font-size: 24px;
      border-radius: 2px;
      vertical-align: middle;
      margin-right: 14px;
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
    .google-icon-color, .fa-google-plus-square {
      color: #d34836;
    }

    span {
      color: #616669;
      font-family: Lato;
      font-size: 14px;
      line-height: 17px;
      vertical-align: middle;
    }
  }

  .slot-timestamp {
    position: relative;
    border-top: 1px solid #DBDFE0;

    &:hover {
      background-color: #F4F9FD;
    }

    &.active {
      background-color: #F4F9FD;
      border-bottom: 1px solid #67C5E6;
      border-top: 1px solid #67C5E6;
      margin-bottom: -1px;
      z-index: 1;
    }

    button {
      width: 238px;
      height: 32px;
      text-align: left;
      color: #8C9496 !important;
      font-family: Lato;
      font-size: 12px;
      font-weight: bold;
      line-height: 15px;
      border: none;
      
      &.active {
        background-color: #F0F3F4;
        border-radius: 4px;
      }
    }
    i {
      visibility: hidden;
      position: absolute;
      top: 8px;
      right: 10px;
      font-size: 16px;
      color: #333;
      text-align: right;
      cursor: pointer;
    }
    &:hover i {
      visibility: visible;
    }
  }
`;

export default Wrapper;

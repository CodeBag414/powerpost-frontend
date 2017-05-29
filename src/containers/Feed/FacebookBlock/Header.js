import styled from 'styled-components';

const Header = styled.div`

  .fb-header-avatar img {
    width: 40px;
    margin-right: 8px;
  }
  .fb-header-avatar {
    i {
      font-size: 40px;
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
  }

  .fb-header-channel-name {
    display: block;
  }

  div {
    display: inline-block;
    vertical-align: middle;
  }

  a {
    vertical-align: middle;
    font-size: 14px;
    line-height: 1.38;
    color: #365899;
  }

  span {
    color: #90949c;
    font-size: 12px;
    line-height: 1.34;
  }
`;

export default Header;

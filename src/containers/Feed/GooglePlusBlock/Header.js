import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px;

  .gp-header-avatar img {
    width: 36px;
    margin-right: 8px;
    border-radius: 50%;
  }
  a {
    color: rgba(0,0,0,0.87);
    text-decoration: none;
  }
  .left-box > * {
    display: inline-block;
    vertical-align: middle;
  }
  
  .right-arrow {
    width: 18px;
    height: 18px;
    svg path {
      fill: #9e9e9e;
    }
  }
  .public {
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    color: rgba(0,0,0,0.54);
    cursor: pointer;
  }
  .time-stamp {
    color: #9e9e9e;
  }
`;

export default Header;

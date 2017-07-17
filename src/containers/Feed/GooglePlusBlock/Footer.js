import styled from 'styled-components';

const Footer = styled.div`
  margin: 16px 8px;

  .left-box {
    margin: 0 8px;
    .gp-likes {
      width: 36px;
      height: 36px;
      line-height: 36px;
      background: #eeeeee;
      color: rgba(0,0,0,0.54);
      fill: rgba(0,0,0,0.54);
      transition: background .3s;
      border-radius: 50%;
      cursor: pointer;
      outline: none;
      text-align: center;
      font-size: 16px;
      font-weight: 500;

      &:hover {
        background: #f5f5f5;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.26);
      }
    }
  }
`;

export default Footer;

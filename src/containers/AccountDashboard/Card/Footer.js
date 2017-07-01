import styled from 'styled-components';

const Footer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  alignItems: flex-end;
  height: 35px;
  padding-right: 7px;
  a:hover {
    text-decoration: none;
  }
  span {
    font-family: Lato;
    font-size: 11px;
    margin-right: 10px;
    color: #E35A88;
  }
  i {
    font-size: 11px;
    color: #E35A88;
  }
`;

export default Footer;

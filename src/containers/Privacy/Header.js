import styled from 'styled-components';

const Header = styled.div`
    position: fixed;
    top: 0;
    z-index: 10000;
    height: 60px;
    right: 0;
    transition: -ms-transform .3s ease-in-out,-webkit-transform .3s ease-in-out,transform .3s ease-in-out, width .3s ease-in-out;
    -webkit-transition: -webkit-transform .3s ease-in-out,transform .3s ease-in-out, width .3s ease-in-out;
    background-image: -webkit-linear-gradient(-180deg, #E81C64 1%, #B6134D 100%);
    background-image: -moz-linear-gradient(-180deg, #E81C64 1%, #B6134D 100%);
    background-image: linear-gradient(-180deg, #E81C64 1%, #B6134D 100%);
    box-shadow: 0 1px 6px 0 rgba(60,92,129,0.20);
    width: 100%;
`;

export default Header;
import styled from 'styled-components';

const BrandIcon = styled.div`
  border-radius: 2.5px;
  background-image: ${(props) => props.thumbnail ? `url(${props.thumbnail})` : `linear-gradient(-180deg, ${props.color} 26%, ${props.color} 100%)`};
  opacity: 1;
  width: ${(props) => props.isActive ? '36px' : '24px'};
  height: ${(props) => props.isActive ? '36px' : '24px'};
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
  line-height: ${(props) => props.isActive ? '36px' : '24px'};
  font-size: 12px;
  margin-bottom: 20px;
  margin-top: 18px;
  position: relative;
  color: white;
  transition: all .3s ease;
  &:active, &:focus {
    text-decoration: none;
  }
`;

export default BrandIcon;

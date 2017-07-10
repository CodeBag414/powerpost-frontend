import styled from 'styled-components';

export default styled.div`
  width: 68px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 11px;
  cursor: pointer;

  i {
    font-size: 23px;
    margin-bottom: 2px;
  }
  span {
    font-family: Lato;
    font-size: 8px;
    font-weight: 900;
    line-height: 10px;
    text-align: center;
    text-transform: uppercase;
  }

  ${(props) => props.active && `
    border: 1px solid rgba(103,197,230,0.5);
    color: ${props.fontColor};
    background-color: ${props.bgColor};
    box-shadow: inset 0 0 8px 0 rgba(103,197,230,0.5);
  `}
`;

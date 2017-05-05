import React from 'react';
import styled from 'styled-components';
import chroma from 'chroma-js';

const darken = c => chroma(c).darken();

const Wrapper = styled.div`
  display: block;
  width: ${(props) => props.isCollapsed ? '60px' : '216px'};
  height: 100%;
  background-color: ${(props) => props.color};
  float: left;
  line-height: 32px;
  font-weight: 400;
  color: white;
  background-image: linear-gradient(-180deg, ${(props) => props.color} 26%, ${(props) => darken(props.color)} 100%);
  text-align: left;
  img {
    height: 100%;
    width: 60px;
    padding: ${(props) => props.isCollapsed ? '0px' : '5px'};
    border-radius: ${(props) => props.isCollapsed ? '0px' : '8px'};
  }
  display: inline-flex;
`;

const Span = styled.div`
  font-size: 18px;
  margin-right: ${(props) => props.isCollapsed ? '0px' : '10px'};
  margin-left: 10px;
  height: 32px;
  width: 32px;
  margin: auto auto;
  text-align: center;
  
`;

const Title = styled.div`
  width: calc(216px - 60px);
  line-height: 60px;
  text-align: center;
`;

const AccountLogo = (props) => {
  const shortTitle = props.title ? props.title.slice(0, 2).toUpperCase() : '';
  return(
    <Wrapper {...props} >
    {props.thumbnail ? (<img src={props.thumbnail} />) : (<Span isCollapsed={props.isCollapsed}>{shortTitle}</Span>)}
    {!props.isCollapsed && <Title>{props.title}</Title>}
    </Wrapper>
  );
};

export default AccountLogo;
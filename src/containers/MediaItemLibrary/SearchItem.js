import React from 'react';
import styled from 'styled-components';
import Button from 'elements/atm.Button';
import FontIcon from 'elements/atm.FontIcon';

const Wrapper = styled.div`
  margin-top: 10px;
`;

const UrlHeader = styled.h3`
  font-family: 'Lato';
  font-weight: 700;
  font-size: 11px;
  color: #8C9497;
`;

const Title = styled.h2`
  font-family: 'Lato';
  font-weight: 400;
  font-size: 15px;
  color: #424647;
`;

const Description = styled.div`
 color: #747A7C;
`;

const Image = styled.img`

`;

const SearchItem = (props) => {
  
  return(
    <Wrapper className="row">
      <div className={ props.item.media_type === 'link' ? 'col-md-12' : 'col-md-8'}>
        <UrlHeader>{props.item.source_provider || props.item.media_base_url || props.item.media_url }</UrlHeader>
        <Title>{props.item.title}</Title>
        { props.item.date_friendly && <span>{props.item.date_friendly}</span> }
        <Description>{props.item.description}</Description>
        <Button href={props.item.source_url || props.item.source } target="_blank" label="View" style={{margin: '5px'}} />
        <Button icon='add' label="Add to Media Library" primary style={{ margin: '5px' }} onClick={() => props.handleClick(props.item.source_url || props.item.source)} />
      </div>
      { props.item.media_type !== 'link' &&
        <div className="col-md-4">
          <Image src={props.item.thumbnail_url || props.item.image } />
        </div>
      }
    </Wrapper>
  );
};

export default SearchItem;
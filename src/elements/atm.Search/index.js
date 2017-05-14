import React from 'react';

import Wrapper from './Wrapper';

function PPSearch(props) {
  return (
    <Wrapper>
      <input {...props} />
      <i className="fa fa-search" />
    </Wrapper>
  );
}

export default PPSearch;

/* eslint-disable camelcase */

import React from 'react';
import Wrapper from './Wrapper';

import Header from 'containers/Privacy/Header';
import Logo from 'containers/Privacy/Logo';

const __html = require('./terms.html');
const template = { __html: __html };

const Terms = () => {

  return (
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      <div dangerouslySetInnerHTML={template} />
    </Wrapper>
  );
};

export default Terms;

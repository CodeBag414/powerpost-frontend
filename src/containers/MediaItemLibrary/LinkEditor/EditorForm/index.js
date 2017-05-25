import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';

import FontIcon from 'elements/atm.FontIcon';

import Wrapper from './Wrapper';
import HeadingWrapper from './HeadingWrapper';

class EditorForm extends Component {
  render() {
    return (
      <Wrapper>
        <HeadingWrapper>
          <h3>Content Editor<span><i className="fa fa-link" />http://www.espn.com/</span></h3>
          <button><FontIcon value="clear" /></button>
        </HeadingWrapper>
        <p>Modify the link information below.</p>
        <Input type="text" label="Title" />
      </Wrapper>
    );
  }
}

export default EditorForm;

import React, { PropTypes } from 'react';

import LeftPane from 'components/LeftPane';
import RightPane from 'components/RightPane';
import imgLogo from 'assets/images/logo.png';

import Wrapper from './Wrapper';
import Topbar from './Topbar';
import FormWrapper from './FormWrapper';

export class Login extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  }

  render() {
    const { children } = this.props;
    return (
      <Wrapper>
        <LeftPane>
        </LeftPane>
        <RightPane>
          <Topbar />
          <FormWrapper>
            { React.cloneElement(children, {
              discount: this.discount,
            })
            }
          </FormWrapper>
        </RightPane>
      </Wrapper>
    );
  }
}

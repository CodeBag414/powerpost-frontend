import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LeftPane from 'components/LeftPane';
import RightPane from 'components/RightPane';

import Wrapper from './Wrapper';
import FormWrapper from './FormWrapper';
import Topbar from './Topbar';

import imgLogo from 'assets/images/logo.png';

class Signup extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);

    this.formData = {};
  }

  saveFormData = (data) => {
    this.formData = data;
  }

  render() {
    const { children } = this.props;
    const {
      planName = '14-Day Trial',
      price = '199',
      cycle = 'Monthly',
      userCount = '20',
      channelCount = '50',
      hubCount = '1',
    } = {};

    return (
      <Wrapper>
        <LeftPane>
          <img src={imgLogo} alt="Logo" />
          <div style={{ marginTop: '120px' }}>PowerPost Business Plan</div>
          <div style={{ marginTop: '20px', fontSize: '2.5rem' }}>{planName}</div>
          <div style={{ marginTop: '15px' }}>
            <span style={{ fontSize: '1.5rem' }}>${price}</span>&nbsp;
            <span>{cycle}</span>
          </div>
          <div style={{ marginTop: '15px' }}>
            {userCount} Users. {channelCount} Channels. {hubCount} Central Content Hub.
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}>Not the plan you want, we've got you covered. View Plans</div>
        </LeftPane>
        <RightPane>
          <Topbar />
          <FormWrapper>
            { React.cloneElement(children, {
              saveFormData: this.saveFormData,
            })
            }
          </FormWrapper>
        </RightPane>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Wrapper from './Wrapper';
import FormWrapper from './FormWrapper';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import Topbar from './Topbar';

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

    return (
      <Wrapper>
        <LeftPane />
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

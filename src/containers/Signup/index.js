import React, { Component } from 'react';
import PPInput from 'elements/atm.Input';
import PPRaisedButton from 'elements/atm.RaisedButton';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import classnames from 'classnames';

import { registerRequest } from 'containers/App/actions';
import { makeSelectAuthError, selectAuth } from 'containers/App/selectors';

import styles from './styles.scss';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameValue: '',
      nameError: '',
      emailValue: '',
      emailError: '',
      passwordValue: '',
      passwordConfirmValue: '',
      passwordConfirmError: '',
      passwordError: '',
      validPassword: false,
      errorText: props.error || '',
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.validPassword) {
      this.props.register(this.state.nameValue, this.state.emailValue, this.state.passwordValue);
    } else {
      this.setState({ errorText: 'Passwords do not match' });
    }
  }

  onNameChange = (value) => {
    this.setState({ nameValue: value });
  }

  onEmailChange = (value) => {
    this.setState({ emailValue: value });
  }

  onPasswordChange = (value) => {
    this.setState({ passwordValue: value });
  }

  onPasswordConfirmChange = (value) => {
    this.setState({ passwordConfirmValue: value });
    if (value === this.state.passwordValue) {
      this.setState({ validPassword: true, passwordConfirmError: '' });
    } else if (this.state.validPassword) {
      this.setState({ validPassword: false });
    }

    if (value !== this.state.passwordValue) {
      this.setState({ passwordConfirmError: 'Password does not match previous password' });
    }
  }

  render() {
    return (
      <div className={styles.signup}>
        <div className={styles.leftPane}>

        </div>
        <div className={styles.rightPane}>
          <div className={styles.topBar}>
            Already have an account? <Link to="/login"><div>Sign In</div></Link>
          </div>
          <form onSubmit={this.onFormSubmit}>
            <PPInput type="text" error={ this.state.nameError } value={ this.state.nameValue } label="Display Name" onChange={ this.onNameChange }/>
            <PPInput type="email" error={ this.state.emailError } value={ this.state.emailValue } label="Email" onChange={ this.onEmailChange }/>

            <PPInput type="password" error={ this.state.passwordError } value={ this.state.passwordValue } label="Password" onChange={ this.onPasswordChange }/>
            <PPInput type="password" error={ this.state.passwordConfirmError } value={ this.state.passwordConfirmValue } label="Confirm Password" onChange={ this.onPasswordConfirmChange }/>

            <PPRaisedButton type="submit" label="Sign Up" primary={ true } />
          </form>
          <div> { this.state.errorText }</div>
        </div>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    register: (name, email, password) => dispatch(registerRequest({ name, email, password })),
  };
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

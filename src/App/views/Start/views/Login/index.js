/*
 * Login View
 *
 * 
 */

import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import {loginRequest} from '../../../../state/actions';

<<<<<<< HEAD
import PPInput from 'App/shared/atm.Input';
=======
import PPTextField from 'App/shared/atm.TextField';
>>>>>>> dev
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import { Link } from 'react-router';

import { push } from 'react-router-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
    
       this.state = {
           emailValue: '',
           passwordValue: '',
       };
       
       this.changeEmail = this.changeEmail.bind(this);
       this.changePassword = this.changePassword.bind(this);
    }

    changeEmail(event) {
        this.setState({ emailValue: event.target.value });
    }
    
    changePassword(event) {
        this.setState({ passwordValue: event.target.value });
    }
    
    render() {
        return (
            <div>
                <h4>Login</h4>
                <Link to="/signup">Register</Link>
                <PPInput type="text" hintText="your email" floatingLabelText="Email" onChange={ this.changeEmail } />
                <PPInput type="password" hintText="your secure password" floatingLabelText="Password" onChange={ this.changePassword } />
                
                <PPRaisedButton label="Login" primary={ true } onClick={ () => this.props.login(this.state.emailValue, this.state.passwordValue) } />
            </div>
        );
    }
}

export function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(loginRequest({email, password})),
  };
}

function mapStateToProps(state) {
    return {
        //authError: state.auth.error
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
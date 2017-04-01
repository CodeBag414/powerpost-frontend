/*
 * Signup View
 *
 * 
 */

import React from 'react';
import PPInput from 'App/shared/atm.Input';
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Link} from 'react-router';

import {registerRequest} from '../../../../state/actions';
import {makeSelectAuthError, selectAuth} from '../../../../state/selectors';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        const initialState = {
            nameValue: '',
            nameError: '',
            emailValue: '',
            emailError: '',
            passwordValue: '',
            passwordConfirmValue: '',
            passwordConfirmError: '',
            passwordError: '',
            validPassword: false,
            errorText: this.props.error || '',
        };
        
        this.state = initialState;
        
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
    }
    
    onFormSubmit(event) {
        event.preventDefault();
        
        if(this.state.validPassword) {
            this.props.register(this.state.nameValue, this.state.emailValue, this.state.passwordValue);       
        }else {
            this.setState({ errorText: 'Passwords do not match' });
        }
    }
    
    onNameChange(value) {
        this.setState({ nameValue: value });
    }
    
    onEmailChange(value) {
        this.setState({ emailValue: value });        
    }
    
    onPasswordChange(value) {
        this.setState({ passwordValue: value });        
    }
    
    onPasswordConfirmChange(value) {
        this.setState({ passwordConfirmValue: value });
        if(value == this.state.passwordValue) {
            this.setState({ validPassword: true, passwordConfirmError: '' });
        } else if(this.state.validPassword) {
            this.setState({ validPassword: false });
        }
        
        if(value != this.state.passwordValue) {
            this.setState({ passwordConfirmError: 'Password does not match previous password'});
        }
    }
    render() {
        return (
            <div>
                in signup view
                <Link to="/start">Back to login</Link>
                <form onSubmit={ this.onFormSubmit } >
                    <PPInput type='text' error={ this.state.nameError } value={ this.state.nameValue } label="Display Name" onChange={ this.onNameChange }/>
                    <PPInput type="email" error={ this.state.emailError } value={ this.state.emailValue } label="Email" onChange={ this.onEmailChange }/>
                    
                    <PPInput type="password" error={ this.state.passwordError } value={ this.state.passwordValue } label="Password" onChange={ this.onPasswordChange }/>
                    <PPInput type="password" error={ this.state.passwordConfirmError } value={ this.state.passwordConfirmValue } label="Confirm Password" onChange={ this.onPasswordConfirmChange }/>
                    
                    <PPRaisedButton type="submit" label="Sign Up" primary={ true } />
                </form>
                <div> { this.state.errorText }</div>
            </div>
        );
    }
}

export function mapDispatchToProps(dispatch) {
  return {
    register: (name, email, password) => dispatch(registerRequest({name, email, password})),
  };
}

const mapStateToProps = createStructuredSelector({
   // error: selectAuth()
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
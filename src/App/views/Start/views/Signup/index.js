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
    
    onNameChange(event) {
        this.setState({ nameValue: event.target.value });
    }
    
    onEmailChange(event) {
        this.setState({ emailValue: event.target.value });        
    }
    
    onPasswordChange(event) {
        this.setState({ passwordValue: event.target.value });        
    }
    
    onPasswordConfirmChange(event) {
        if(event.target.value == this.state.passwordValue) {
            this.setState({ validPassword: true, passwordConfirmError: '' });
        } else if(this.state.validPassword) {
            this.setState({ validPassword: false });
        }
        
        if(event.target.value != this.state.passwordValue) {
            this.setState({ passwordConfirmError: 'Password does not match previous password'});
        }
    }
    render() {
        return (
            <div>
                in signup view
                <Link to="/start">Back to login</Link>
                <form onSubmit={ this.onFormSubmit } >
                    <PPInput type='text' error={ this.state.nameError } label="Display Name" onChange={ this.onNameChange }/>
                    <PPInput type="email" error={ this.state.emailError } label="Email" onChange={ this.onEmailChange }/>
                    
                    <PPInput type="password" error={ this.state.passwordError } label="Password" onChange={ this.onPasswordChange }/>
                    <PPInput type="password" error={ this.state.passwordConfirmError } label="Confirm Password" onChange={ this.onPasswordConfirmChange }/>
                    
                    <PPRaisedButton type="submit" label="Register" primary={ true } />
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
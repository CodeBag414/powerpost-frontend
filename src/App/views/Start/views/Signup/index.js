/*
 * Signup View
 *
 * 
 */

import React from 'react';
import PPTextField from 'App/shared/atm.TextField';
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Link} from 'react-router';

import {registerRequest} from '../../../../state/actions';
import {makeSelectAuthError, selectAuth} from '../../../../state/selectors';

const loginBtn = {
        
        margin: '50px',
        border: '0px',
        marginLeft: '145px',
    };
    
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
            <form>
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <Link to="/start" style={{color:'#e52466'}}> Back to login</Link>
                <form onSubmit={ this.onFormSubmit } >
                    <PPTextField type='text' errorText={ this.state.nameError } floatingLabelText="Display Name" hintText="name" hintStyle={{padding: '5px', bottom: '3px' }} onChange={ this.onNameChange }/>
                    <PPTextField type="email" errorText={ this.state.emailError } floatingLabelText="Email" hintText="your email" hintStyle={{padding: '5px', bottom: '3px' }} onChange={ this.onEmailChange }/>
                    
                    <PPTextField type="password" errorText={ this.state.passwordError } floatingLabelText="Password" hintText="your secure password" hintStyle={{padding: '5px', bottom: '3px' }} onChange={ this.onPasswordChange }/>
                    <PPTextField type="password" errorText={ this.state.passwordConfirmError } floatingLabelText="Confirm Password" hintText="retype your password" hintStyle={{padding: '5px', bottom: '3px' }}  onChange={ this.onPasswordConfirmChange }/>
                    
                    <PPRaisedButton type="submit" label="Register" secondary={ true } style={loginBtn}/>
                </form>
                <div> { this.state.errorText }</div>
                </div>
                <div className="col-md-4"></div>
            </form>
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
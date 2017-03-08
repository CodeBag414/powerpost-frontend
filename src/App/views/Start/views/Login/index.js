/*
 * Login View
 *
 * 
 */

import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import {loginRequest} from '../../../../state/actions';

import PPTextField from 'App/shared/atm.TextField';
import PPRaisedButton from 'App/shared/atm.RaisedButton';
import { Link } from 'react-router';

import { push } from 'react-router-redux';

const loginBtn = {
        
        margin: '50px',
        border: '0px',
        marginLeft: '120px',
    };
    
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
            <form>
                <row>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                <h3>The Launchpad for Your Brand's Content</h3><br/>
                <p>Transform your content strategy. Try PowerPost free for two weeks.</p>
                </div>
                <div className="col-md-3"> 
                <a id="login-facebook-btn" href="/user_manager/login_facebook?" class="buttn buttn--facebook" onclick="ga('send', 'event', 'Logins', 'Submitted', 'Login with Facebook');">
		    			<i class="fa fa-facebook"></i> Sign In with Facebook
		    		</a><br/>
		    		<a id="buttn buttn--linkedin" href="/user_manager/login_linkedin?" class="m-t-20 buttn buttn--linkedin" onclick="ga('send', 'event', 'Logins', 'Submitted', 'Login with Linkedin');"><i class="fa fa-linkedin"></i> Sign In with LinkedIn
					</a><br/>
                <h4>Login</h4>
                <PPTextField type="text" hintText="your email" floatingLabelText="Email" onChange={ this.changeEmail } />
                <PPTextField type="password" hintText="your secure password" floatingLabelText="Password" onChange={ this.changePassword } />
                <br/>
                <Link to="/signup" style={{color:'#e52466'}}>forgot password?</Link><br/> Don't have an account? <Link to="/signup" style={{color:'#e52466'}}>Sign Up</Link>
                <PPRaisedButton label="Login" secondary={ true } style={loginBtn} onClick={ () => this.props.login(this.state.emailValue, this.state.passwordValue) } />
                </div>
                <div className="col-md-3"></div>
                </row>
            </form>
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
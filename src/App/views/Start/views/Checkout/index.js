import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import PPInput from 'App/shared/atm.Input';
import PPDropdown from 'App/shared/atm.Dropdown';
import PPRaisedButton from 'App/shared/atm.RaisedButton';

const months = [
  { value: '1', label: '01 - January' },
  { value: '2', label: '02 - February' },
  { value: '3', label: '03 - March' },
  { value: '4', label: '04 - April' }
];

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expirationYear: '',
            expirationYearError: '',
            expirationMonth: '1',
            expirationMonthError: '',
        };
    }
    
    onFormSubmit = (event) => {
        event.preventDefault();
        
    }
    
    onMonthChange = (value) => {
        this.setState({ expirationMonth: value });
    }

    onYearChange = (value) => {
        this.setState({ expirationYear: value });
    }

    render() {
        return (
            <div>
                in signup view
                <Link to="/start">Back to login</Link>
                <form onSubmit={ this.onFormSubmit } >
                    <PPDropdown auto error={ this.state.expirationMonthError } value={ this.state.expirationMonth } source={months} onChange={ this.onMonthChange }/>
                    
                    <PPRaisedButton type="submit" label="Sign Up" primary={ true } />
                </form>
            </div>
        );
    }
}

export function mapDispatchToProps(dispatch) {
  return {
    // register: (name, email, password) => dispatch(registerRequest({name, email, password})),
  };
}

const mapStateToProps = createStructuredSelector({
   // error: selectAuth()
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

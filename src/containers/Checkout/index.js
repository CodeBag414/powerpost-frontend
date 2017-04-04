import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import moment from 'moment';
import { range } from 'lodash';

import PPInput from 'elements/atm.Input';
import PPDropdown from 'elements/atm.Dropdown';
import PPRaisedButton from 'elements/atm.RaisedButton';

const monthOptions = moment.months().map((month, index) => {
    let mm = index + 1;
    if (mm >= 10) {
        mm = '' + mm;
    } else {
        mm = '0' + mm;
    }

    return { value: index + 1, label: `${mm} - ${month}` };
});
const yearOptions = range(2018, 2033).map(year => ({
    value: year,
    label: year,
}));

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expirationYear: 2018,
            expirationMonth: 1,
            cardNumberValue: '',
            cardNumberError: '',
            cvcValue: '',
            cvcError: ''
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

    onCardNumberChange = (value) => {
        this.setState({ cardNumberValue: value });
    }

    onCvcChange = (value) => {
        this.setState({ cvcValue: value });
    }

    render() {
        return (
            <div>
                in signup view
                <Link to="/login">Back to login</Link>
                <form onSubmit={ this.onFormSubmit } >
                    <div className="row">
                        Credit Card Expiration Date
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <PPDropdown auto value={ this.state.expirationMonth } source={monthOptions} onChange={ this.onMonthChange } />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <PPDropdown auto value={ this.state.expirationYear } source={yearOptions} onChange={ this.onYearChange } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <PPInput type="number" error={ this.state.cardNumberError } value={ this.state.cardNumberValue } label="Credit Card #" onChange={ this.onCardNumberChange } />
                        </div>
                        <div className="col-sm-12">
                            <PPInput type="number" error={ this.state.cvcError } value={ this.state.cvcValue } label="CVC #" onChange={ this.onCvcChange }/>
                        </div>
                    </div>
                    
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

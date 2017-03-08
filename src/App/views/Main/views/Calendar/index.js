/*
 * Calendar View
 *
 * 
 */

import React from 'react';
//import BigCalendar from 'react-big-calendar';
//import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
//BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class Post extends React.Component {
    
    render() {

        return (
            <div className="col-md-12">
                <row>
                <div className="col-md-8">
                <h4>Powerpost Calendar</h4>
               
                </div>
                <div className="col-md-4"></div>
                </row>
            </div>
        );
    }
}
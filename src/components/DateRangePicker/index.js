import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import Wrapper from './Wrapper';

class DateRangePickerComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
    };
  }

  handleEvent = (event, picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
    if (this.props.onChange) {
      this.props.onChange(picker);
    }
  }

  render() {
    const { ranges } = this.state;
    const { startDate, endDate } = this.props;
    const start = startDate.format('YYYY-MM-DD');
    const end = endDate.format('YYYY-MM-DD');
    let label = `${start} - ${end}`;
    if (start === end) {
      label = start;
    }
    return (
      <DateRangePicker startDate={startDate} endDate={endDate} ranges={ranges} onEvent={this.handleEvent}>
        <Wrapper className="selected-date-range-btn">
          {label}
          <span className="caret" />
        </Wrapper>
      </DateRangePicker>
    );
  }
}

export default DateRangePickerComponent;

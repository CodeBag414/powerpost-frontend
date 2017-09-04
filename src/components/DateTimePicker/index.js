import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePickerWrapper from './DatePickerWrapper';

class DateTimePicker extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  state = {
    initialValue: '',
  };

  componentWillMount() {
    if (this.props.type === 'date') {
      this.setState({ initialValue: moment().format('YYYY-MM-DD') });
    } else {
      this.setState({ initialValue: moment().format('HH:mm') });
    }
  }

  render() {
    const { initialValue } = this.state;
    return (
      <DatePickerWrapper {...this.props} defaultValue={initialValue} />
    );
  }
}

export default DateTimePicker;

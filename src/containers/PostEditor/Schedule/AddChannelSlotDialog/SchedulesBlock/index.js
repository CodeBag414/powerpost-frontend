import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DateTimePicker from 'components/DateTimePicker';

import Wrapper from './Wrapper';

class SchedulesBlock extends Component {
  static propTypes = {
    scheduleTimes: PropTypes.array,
    onChangeScheduleTimes: PropTypes.func,
  };

  removeSchedule = (index) => {
    const { scheduleTimes, onChangeScheduleTimes } = this.props;
    const newScheduleTimes = scheduleTimes.slice();
    newScheduleTimes.splice(index, 1);
    onChangeScheduleTimes(newScheduleTimes);
  }

  addSchedule = () => {
    const { scheduleTimes, onChangeScheduleTimes } = this.props;
    const newScheduleTimes = scheduleTimes.slice();
    newScheduleTimes.push(newScheduleTimes[newScheduleTimes.length - 1]);
    onChangeScheduleTimes(newScheduleTimes);
  }

  changeDate = (index, e) => {
    const { scheduleTimes, onChangeScheduleTimes } = this.props;
    const newScheduleTimes = scheduleTimes.slice();
    newScheduleTimes[index] = moment(`${e.target.value} ${moment(newScheduleTimes[index]).format('HH:mm')}`).valueOf();
    onChangeScheduleTimes(newScheduleTimes);
  }

  changeTime = (index, e) => {
    const { scheduleTimes, onChangeScheduleTimes } = this.props;
    const newScheduleTimes = scheduleTimes.slice();
    const newTime = moment(e.target.value, 'HH:mm');
    const newDateTime = new Date(newScheduleTimes[index]);
    newDateTime.setHours(newTime.get('hour'), newTime.get('minute'));
    newScheduleTimes[index] = newDateTime.getTime();
    onChangeScheduleTimes(newScheduleTimes);
  }

  render() {
    const { scheduleTimes } = this.props;
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
    return (
      <Wrapper>
        <div className="controls-wrapper">
          Dates and Times
        </div>
        {
          scheduleTimes.map((scheduleTime, index) =>
            <div className="controls-wrapper date-time-picker" key={index}>
              <div className="first">
                <DateTimePicker
                  type="date"
                  onChange={(e) => this.changeDate(index, e)}
                  value={moment(scheduleTime).format('YYYY-MM-DD')}
                />
              </div>
              <div className="second">
                <DateTimePicker
                  type="time"
                  onChange={(e) => this.changeTime(index, e)}
                  value={moment(scheduleTime).format('HH:mm')}
                />
              </div>
              <div className="action">
                {
                  index
                  ? <div className="btn-close-schedule" onClick={() => this.removeSchedule(index)}>×</div>
                  : null
                }
              </div>
            </div>
          )
        }
        <div className="add-another" onClick={this.addSchedule}>
          + Add Another
        </div>
      </Wrapper>
    );
  }
}

export default SchedulesBlock;

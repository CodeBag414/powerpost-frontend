import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import SmoothCollapse from 'react-smooth-collapse';
import moment from 'moment';

import Heading from 'components/Heading';
import MultiLineInput from 'components/MultiLineInput';
import Dropdown from 'elements/atm.Dropdown';
import PPTextField from 'elements/atm.TextField';
import DatePicker from 'elements/atm.DatePicker';
import TimePicker from 'elements/atm.TimePicker';

import Wrapper from './Wrapper';
import LabelWrapper from './LabelWrapper';
import ScheduleRowWrapper from './ScheduleRowWrapper';

const defaultDestinationOption = {
  value: '0',
  label: 'Do Not Send To Wordpress',
};

export class WordpressSettings extends Component {
  static propTypes = {
    connections: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      destination: defaultDestinationOption,
      urlName: '',
      description: '',
      scheduleTime: new Date().getTime() / 1000,
    };
  }

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  handleBlogChange = (option) => {
    this.setState({
      destination: option,
    });
  }

  handleDateChange = (date) => {
    const { updatePost } = this.props;
    const { currentPost } = this.state;

    const newDate = new Date(date).getTime() / 1000;
    this.setState({
      scheduleTime: newDate,
    });

    const newPost = {
      ...currentPost.toJS(),
      schedule_time: newDate,
    };
    updatePost(newPost);
  }

  handleDescriptionChange = (value) => {
    this.setState({
      description: value,
    });
  }

  handleUrlNameChange = (ev) => {
    const { value } = ev.target;

    this.setState({
      urlName: value,
    });
  }

  handlePostSave = () => {

  }

  render() {
    const {
      connections = [],
    } = this.props;

    const {
      isExpanded,
      destination,
      urlName,
      description,
      scheduleTime,
    } = this.state;

    const destinationOptions = [defaultDestinationOption]
      .concat(connections.map((c) => ({
        value: c.connection_id,
        label: c.display_name,
      })));

    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);

    const disabled = destination.value === '0';

    return (
      <Wrapper>
        <Heading
          title="Wordpress Settings"
          icon="file-text-o"
          iconColor="#E81C64"
          expand={this.expand}
          isExpanded={isExpanded}
        />
        <SmoothCollapse expanded={isExpanded}>
          <LabelWrapper>Destination</LabelWrapper>
          <Dropdown
            value={destination}
            options={destinationOptions}
            placeholder="-"
            onChange={this.handleBlogChange}
          />
          <LabelWrapper>URL Name</LabelWrapper>
          <PPTextField
            disabled={disabled}
            type="text"
            name="urlName"
            hintText="Url Name"
            value={urlName}
            onBlur={this.handlePostSave}
            onChange={this.handleUrlNameChange}
          />
          <LabelWrapper style={{ marginTop: '6px' }}>Description</LabelWrapper>
          <MultiLineInput
            hasBorder
            disabled={disabled}
            message={description}
            handleMessageChange={this.handleDescriptionChange}
            onBlur={this.handlePostSave}
          />
          <LabelWrapper>Schedule</LabelWrapper>
          <ScheduleRowWrapper>
            <div>
              <DatePicker
                readonly={disabled}
                minDate={minDate}
                value={moment.unix(scheduleTime).toDate()}
                onChange={this.handleDateChange}
              />
            </div>
            <div>
              <TimePicker
                readonly={disabled}
                format="ampm"
                value={moment.unix(scheduleTime).toDate()}
                onChange={this.handleDateChange}
              />
            </div>
          </ScheduleRowWrapper>
        </SmoothCollapse>
      </Wrapper>
    );
  }
}

function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(WordpressSettings);

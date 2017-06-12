import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SmoothCollapse from 'react-smooth-collapse';
import moment from 'moment';

import Heading from 'components/Heading';
import MultiLineInput from 'components/MultiLineInput';
import AutoMultiSelect from 'components/AutoMultiSelect';
import Loading from 'components/Loading';

import Dropdown from 'elements/atm.Dropdown';
import PPTextField from 'elements/atm.TextField';
import DatePicker from 'elements/atm.DatePicker';
import TimePicker from 'elements/atm.TimePicker';
import Checkbox from 'elements/atm.Checkbox';

import Wrapper from './Wrapper';
import LabelWrapper from './LabelWrapper';
import ScheduleRowWrapper from './ScheduleRowWrapper';

const defaultDestinationOption = {
  value: '0',
  label: 'Do Not Send To Wordpress',
};

export class WordpressSettings extends Component {
  static propTypes = {
    postSet: ImmutablePropTypes.map,
    connections: PropTypes.array,
    wordpressGUI: ImmutablePropTypes.map,
    post: ImmutablePropTypes.map,
    updatePost: PropTypes.func,
    createPost: PropTypes.func,
    fetchWordpressGUI: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: props.postSet.getIn(['details', 'title']),
      destination: defaultDestinationOption,
      slug: '',
      description: '',
      scheduleTime: new Date().getTime() / 1000,
      allowComments: false,
      categories: [],
      categorySuggestions: [],
      tags: [],
      tagSuggestions: [],
      authorId: 0,
      isExpanded: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.wordpressGUI.get('isFetching') && !nextProps.wordpressGUI.get('isFetching')) {
      if (!nextProps.wordpressGUI.get('error')) {
        this.setState({
          categorySuggestions: nextProps.wordpressGUI
            .getIn(['data', 'categories'])
            .map((c) => c.get('slug')),
          tagSuggestions: nextProps.wordpressGUI
            .getIn(['data', 'terms'])
            .map((t) => t.get('slug')),
        });
      }
    }
  }

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  handleBlogChange = (option) => {
    const {
      fetchWordpressGUI,
      createPost,
      updatePost,
      postSet,
      post,
    } = this.props;

    this.setState({
      destination: option,
      categories: [],
      tags: [],
    });

    if (post.get('data').isEmpty()) {
      createPost({
        post_set_id: postSet.getIn(['details', 'post_set_id']),
        connection_id: option.value,
        status: 2,
        schedule_time: new Date().getTime() / 1000,
        message: postSet.getIn(['details', 'message']),
      });
    } else {
      const data = post.get('data').toJS();
      if (option.value === '0') { // Do not post to wordpress
        updatePost({
          ...data,
          status: 0,    // Set to inactive
        });
      } else {
        updatePost({
          ...data,
          connection_id: option.value,
        });
      }
    }

    if (option.value !== '0') {
      fetchWordpressGUI({
        connectionId: option.value,
      });
    }
  }

  handleCategoriesChange = (categories) => {
    this.setState({
      categories,
    });

    this.handlePostSave({ categories });
  }

  handleCommentsChange = (allowComments) => {
    this.setState({
      allowComments,
    });
    this.handlePostSave({ allow_comments: allowComments });
  }

  handleDateChange = (date) => {
    const { post, updatePost } = this.props;

    const newDate = new Date(date).getTime() / 1000;
    this.setState({
      scheduleTime: newDate,
    });

    const newPost = {
      ...post.get('data').toJS(),
      schedule_time: newDate,
    };
    updatePost(newPost);
  }

  handleDescriptionChange = (value) => {
    this.setState({
      description: value,
    });
  }

  handleSlugChange = (ev) => {
    const { value } = ev.target;

    this.setState({
      slug: value,
    });
  }

  handlePostSave = (newParam) => {
    const { post, updatePost } = this.props;
    const {
      authorId,
      title,
      slug,
      description,
      allowComments,
      tags,
      categories,
    } = this.state;

    const purePost = post.get('data').toJS();
    const newPost = {
      ...purePost,
      properties: {
        ...purePost.properties,
        author_id: authorId,
        title,
        slug,
        description,
        allow_comments: allowComments,
        tags,
        categories,
        // featured_image_id
        ...newParam,
      },
    };

    updatePost(newPost);
  }

  handleTagsChange = (tags) => {
    this.setState({
      tags,
    });

    this.handlePostSave({ tags });
  }

  handleTitleChange = (ev) => {
    const { value } = ev.target;

    this.setState({
      title: value,
    });
  }

  render() {
    const {
      post,
      connections = [],
    } = this.props;

    const {
      isExpanded,
      destination,
      title,
      slug,
      description,
      scheduleTime,
      allowComments,
      categories,
      categorySuggestions,
      tags,
      tagSuggestions,
    } = this.state;

    const wordpressOptions = connections
    .filter((c) => c.channel === 'wordpress')
    .map((c) => ({
      value: c.connection_id,
      label: c.display_name,
    }));

    const destinationOptions = [defaultDestinationOption]
      .concat(wordpressOptions);

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
          <LabelWrapper>Title</LabelWrapper>
          <PPTextField
            disabled={disabled}
            type="text"
            name="title"
            hintText="Title"
            value={title}
            onBlur={() => this.handlePostSave()}
            onChange={this.handleTitleChange}
          />
          <LabelWrapper>URL Name</LabelWrapper>
          <PPTextField
            disabled={disabled}
            type="text"
            name="slug"
            hintText="Url Name"
            value={slug}
            onBlur={() => this.handlePostSave()}
            onChange={this.handleSlugChange}
          />
          <LabelWrapper style={{ marginTop: '6px' }}>Description</LabelWrapper>
          <MultiLineInput
            hasBorder
            disabled={disabled}
            message={description}
            handleMessageChange={this.handleDescriptionChange}
            onBlur={() => this.handlePostSave()}
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
          <LabelWrapper rightLabel="Create new categories">Categories</LabelWrapper>
          <AutoMultiSelect
            disabled={disabled}
            items={categories}
            suggestions={categorySuggestions}
            onChange={this.handleCategoriesChange}
          />
          <LabelWrapper rightLabel="Create new tags">Tags</LabelWrapper>
          <AutoMultiSelect
            disabled={disabled}
            items={tags}
            suggestions={tagSuggestions}
            onChange={this.handleTagsChange}
          />
          <LabelWrapper />
          <Checkbox
            checked={allowComments}
            disabled={disabled}
            label="Allow Comments"
            name="allow"
            onChange={this.handleCommentsChange}
          />
        </SmoothCollapse>
        { post.get('processing') &&
          <Loading />
        }
      </Wrapper>
    );
  }
}

export default WordpressSettings;

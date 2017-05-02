import React from 'react';

import Checkbox from 'react-toolbox/lib/checkbox';

import Wrapper from './Wrapper';

const checkBoxStyles = {
  width: 14,
  height: 14,

};

class CalendarSidebar extends React.Component {

  state = {
    showReady: true,
    showReview: true,
    showDraft: true,
    showIdea: true,
  };

  handleChangeCheckbox = (value, event) => {
    const { onToggleFilter } = this.props;
    const filter = event.target.name;
    this.setState({
      [filter]: value,
    });
    onToggleFilter(filter, value);
  }

  getUnscheduledPosts = (posts) => {
    return posts.map((post) => {
      if (!post.post.schedule_time) {
        return post;
      }
    }).filter(post => post);
  }

  render() {
    const { showReady, showReview, showDraft, showIdea } = this.state;
    const { posts, query, onSearch, onToggleFilter } = this.props;
    const unscheduledPosts = this.getUnscheduledPosts(posts);
    return (
      <Wrapper>
        <div className="cal-sidebar-search">
          <input placeholder="Search Title and Tags" value={query} onChange={(e) => onSearch(e.target.value)} />
          <i className="fa fa-search" />
        </div>
        <div className="cal-sidebar-statuses">
          <div className="cal-sidebar-title">
            Post Status
          </div>
          <Checkbox
            checked={showReady}
            label="Ready"
            name="showReady"
            onChange={this.handleChangeCheckbox}
            className="cal-sidebar-checkbox showReady"
          />
          <Checkbox
            checked={showReview}
            label="Review"
            name="showReview"
            onChange={this.handleChangeCheckbox}
            className="cal-sidebar-checkbox showReview"
          />
          <Checkbox
            checked={showDraft}
            label="Draft"
            name="showDraft"
            onChange={this.handleChangeCheckbox}
            className="cal-sidebar-checkbox showDraft"
          />
          <Checkbox
            checked={showIdea}
            label="Idea"
            name="showIdea"
            onChange={this.handleChangeCheckbox}
            className="cal-sidebar-checkbox showIdea"
          />
        </div>
        <div className="cal-sidebar-unscheduled">
          <div className="cal-sidebar-title">
            Unscheduled ({unscheduledPosts.length})
          </div>
          {
            unscheduledPosts.map((post) => {
              return (
                <div className="cal-sidebar-unscheduled-item">
                  {post.post_set.title ? post.post_set.title : 'Untitled post'}
                </div>
              );
            })
          }
        </div>
      </Wrapper>
    );
  }
}

export default CalendarSidebar;

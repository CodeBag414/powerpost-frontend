import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Wrapper from './Wrapper';
import Toolbar from './Toolbar';
import PopupMenu from './PopupMenu';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const formats = {
  dateFormat: 'D',
};

class CalendarView extends React.Component {

  static propTypes = {
    posts: PropTypes.array,
    query: PropTypes.string,
    filters: PropTypes.array,
    onMoveEvent: PropTypes.func,
    onDeleteEvent: PropTypes.func,
  };

  state = {
    showPopup: false,
    popupPosition: { x: 0, y: 0 },
    currentPost: null,
  };

  eventPropGetter = (event) => {
    const { post, post_set } = event.post;
    let bgColor;
    let fgColor;
    let borderColor;
    if (moment().diff(moment.unix(post.schedule_time)) > 0) { // if the post is in the past, it means it's already published. Otherwise, it's an error, so don't show it
      bgColor = '#eee';
      borderColor = '#eee';
      fgColor = '#aaa';
    } else {
      switch (post_set.status) {
        case '3':
          bgColor = 'rgba(171,230,106,0.5)'; // Ready
          borderColor = '#ABE76A';
          fgColor = '#65883D';
          break;
        case '5':
          bgColor = 'rgba(177,113,181,0.5)'; // Review
          borderColor = '#B171B6';
          fgColor = '#965B9A';
          break;
        case '2':
          bgColor = 'rgba(103,197,230,0.5)'; // Draft
          borderColor = '#67C5E7';
          fgColor = '#428096';
          break;
        case '6':
          bgColor = '#ACB5B8'; // Idea
          borderColor = '#ABE76A';
          fgColor = '#65883D';
          break;
        default:
          bgColor = 'EFEFEF'; // Same as Unscheduled (gray)
          borderColor = '#DBDFE0';
          fgColor = '#616669';
          break;
      }
    }

    const style = {
      background: bgColor,
      border: `1px solid ${borderColor}`,
      color: fgColor,
    };

    return {
      style,
    };
  }

  eventSelected = (event, e) => {
    const x = e.nativeEvent.clientX;
    const y = e.nativeEvent.clientY;
    this.setState({
      showPopup: true,
      popupPosition: { x, y },
      currentPost: event.post,
    });
  }

  dismissPopup = () => {
    this.setState({ showPopup: false });
  }

  render() {
    const { showPopup, popupPosition, currentPost } = this.state;
    const { posts, query, filters, onMoveEvent, onDeleteEvent } = this.props;
    // console.log('posts', posts);
    // console.log('filters', filters);
    const queryLower = query.toLowerCase();
    const formattedPosts = posts.map((post) => {
      // if (moment().diff(moment.unix(post.post.schedule_time)) > 0 && post.post.status !== '2') { // Don't show posts in the past & unpublished
      //   return null;
      // }
      if (post.post.status === '0') return null; // Don't show deleted posts
      const titleMatch = !query || (post.post_set.title && post.post_set.title.toLowerCase().indexOf(queryLower) !== -1);
      let tagsMatch = !query;
      if (post.post_set.tags) {
        for (let i = 0; i < post.post_set.tags.length; i += 1) {
          const tag = post.post_set.tags[i].toLowerCase();
          if (tag.indexOf(queryLower) !== -1) {
            tagsMatch = true;
            break;
          }
        }
      }
      const filterMatch = filters[post.post_set.status];
      if ((titleMatch || tagsMatch) && filterMatch) {
        return {
          post,
          title: post.post_set.title ? post.post_set.title : 'Untitled post',
          start: new Date(moment.unix(post.post.schedule_time)),
          end: new Date(moment.unix(post.post.schedule_time)),
        };
      }
      return null;
    }).filter((post) => post);
    return (
      <Wrapper>
        <DragAndDropCalendar
          selectable
          popup
          events={formattedPosts}
          components={{
            toolbar: Toolbar,
          }}
          formats={formats}
          onSelectEvent={(this.eventSelected)}
          eventPropGetter={this.eventPropGetter}
          onEventDrop={onMoveEvent}
        />
        {showPopup &&
          <PopupMenu
            popupPosition={popupPosition}
            onOutsideClick={this.dismissPopup}
            onDelete={onDeleteEvent}
            post={currentPost}
          />
        }
      </Wrapper>
    );
  }
}

export default DragDropContext(HTML5Backend)(CalendarView);

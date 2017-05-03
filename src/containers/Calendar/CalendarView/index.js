import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import PopupMenu from 'components/PopupMenu';

import Wrapper from './Wrapper';
import Toolbar from './Toolbar';

const samplePosts = [
  {
    id: '1',
    title: 'First event',
    start: moment('2017-04-25 3:00:00 am'),
    end: moment('2017-04-25 11:00:00 am'),
  },
  {
    id: '2',
    title: 'Second event',
    start: moment('2017-04-26 3:00:00 am'),
    end: moment('2017-04-26 6:00:00 am'),
  },
];

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

let formats = {
  dateFormat: 'D',
};

class CalendarView extends React.Component {

  state = {
    showPopup: false,
    popupPosition: { x: 0, y: 0 },
    currentPost: null,
  };

  eventPropGetter = (event, start, end, isSelected) => {
    const { post } = event.post;
    let bgColor, fgColor, borderColor;
    switch (post.status) {
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

    const style = {
      background: bgColor,
      border: `1px solid ${borderColor}`,
      color: fgColor,
    }
    return {
      style,
    };
  }

  moveEvent = ({ event, start, end }) => {
  }

  eventSelected = (event, e) => {
    const x = e.nativeEvent.clientX;
    const y = e.nativeEvent.clientY;
    this.setState({
      showPopup: true,
      popupPosition: {x, y},
      currentPost: event.post,
    });
  }

  dismissPopup = () => {
    this.setState({ showPopup: false });
  }

  render() {
    const { showPopup, popupPosition, currentPost } = this.state;
    const { posts, query, filters } = this.props;
    // console.log('posts', posts);
    // console.log('filters', filters);
    const queryLower = query.toLowerCase();
    const formattedPosts = posts.map((post) => {
      const titleMatch = !query || (post.post_set.title && post.post_set.title.toLowerCase().indexOf(queryLower) !== -1);
      let tagsMatch = !query;
      if (post.post_set.tags) {
        for (let i = 0; i < post.post_set.tags.length; i++) {
          const tag = post.post_set.tags[i].toLowerCase();
          if (tag.indexOf(queryLower) !== -1) {
            tagsMatch = true;
            break;
          }
        }
      }
      const filterMatch = filters[post.post.status];
      if ((titleMatch || tagsMatch) && filterMatch) {
        return {
          post,
          title: post.post_set.title ? post.post_set.title : 'Untitled post',
          start: moment.unix(post.post.schedule_time),
          end: moment.unix(post.post.schedule_time),
        }
      }
    }).filter(post => post);
    return (
      <Wrapper>
        <DragAndDropCalendar
          selectable
          events={formattedPosts}
          components={{
            toolbar: Toolbar,
          }}
          formats={formats}
          // onSelectSlot={(this.slotSelected)}
          onSelectEvent={(this.eventSelected)}
          eventPropGetter={this.eventPropGetter}
          onEventDrop={this.moveEvent}
        />
        {showPopup &&
          <PopupMenu
            popupPosition={popupPosition}
            onOutsideClick={this.dismissPopup}
            post={currentPost}
          />
        }
      </Wrapper>
    );
  }
}

export default DragDropContext(HTML5Backend)(UserCanAccount(CalendarView));
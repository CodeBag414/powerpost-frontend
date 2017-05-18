import React, { Component } from 'react';
import Toggle from 'react-toggle';
import classnames from 'classnames';

import PopupBorder from 'components/PopupBorder';

import Wrapper from './Wrapper';

const streams = [
  { name: 'facebook', icon: 'fa fa-facebook-square', color: '#39579A' },
  { name: 'twitter', icon: 'fa fa-twitter-square', color: '#44ABF6' },
  { name: 'linkedin', icon: 'fa fa-linkedin-square', color: '#2278B8' },
  { name: 'pinterest', icon: 'fa fa-pinterest-square', color: '#BD081C' },
  { name: 'google', icon: 'fa fa-google-plus-square', color: '#DD4E41' },
];

class SharedStreams extends Component {
  state = {
    includePost: true,
    streamIndex: 0,   // defaults to facevook
    message: '',
    streamMessage: {},
  }

  getStreamMessage = () => {
    const { streamIndex, message, streamMessage } = this.state;
    const streamName = streams[streamIndex].name;

    return streamMessage[streamName] || message;
  }

  switchStream = (streamIndex) => {
    if (!this.state.includePost) {
      return;
    }

    this.setState({
      streamIndex,
    });
  }

  toggleIncludePost = () => {
    this.setState({
      includePost: !this.state.includePost,
    });
  }

  render() {
    const { includePost, streamIndex } = this.state;

    return (
      <Wrapper>
        <div className="first-row">
          <span className="include-label">Include this post in this brand's shared stream?</span>
          <Toggle
            defaultChecked={includePost}
            icons={false}
            onChange={this.toggleIncludePost}
          />
        </div>
        <section className={classnames({ disabled: !includePost })}>
          <div className="second-row">
            Modify Channel Messages
          </div>
          <div className="third-row">
            Optionally, you can click on the icons below to set the default message for each channel
          </div>
          <div className="stream-row">
            { streams.map((s, index) => {
              const color = (includePost && streamIndex === index) ?
                streams[streamIndex].color : undefined;
              return (
                <i
                  key={index}
                  className={classnames(s.icon, { enabled: includePost })}
                  style={{ color }}
                  onClick={() => this.switchStream(index)}
                />
              );
            })}
          </div>
          <div className="popup-wrapper">
            <PopupBorder
              left={0}
              top={16}
              arrowLeft={11 + (30 * streamIndex)}
              borderColor={streams[streamIndex].color}
            >
              <div className="message-wrapper">
                { this.getStreamMessage() }
              </div>
            </PopupBorder>
          </div>
        </section>
      </Wrapper>
    );
  }
}

export default SharedStreams;

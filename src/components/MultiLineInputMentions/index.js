import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MentionsInput, Mention } from 'react-mentions';

import { getData, serialize } from 'utils/request';

import Wrapper from './Wrapper';

import style from './style';
import mentionStyle from './mentionStyle';

class MultiLineInputMentions extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    message: PropTypes.string,
    handleMessageChange: PropTypes.func,
    handleMessageBlur: PropTypes.func,
    hasBorder: PropTypes.bool,
    availableFBChannel: PropTypes.string,
  };

  static defaultProps = {
    placeholder: 'Write something here',
  };

  constructor() {
    super();

    this.suggestions = [];
  }

  getFacebookEntities = (query, callback) => {
    if (query.length >= 2) {
      const payload = {
        connection_id: this.props.availableFBChannel,
        query,
      };

      const data = { payload };
      const params = serialize(data);

      getData(`/connection_api/search_facebook?${params}`)
        .then((response) => {
          if (response.data.result === 'success') {
            const { results } = response.data;
            const fbPages = (results && results.pages) || [];
            const suggestions = fbPages.map((page) => ({ id: page.id, display: page.name })) || [];
            this.suggestions = suggestions;
            callback(this.suggestions.slice(0, 8));
          } else {
            console.log('Error in search_facebook call in MultiLineInputMentions. response: ', response);
          }
        });
    }

    callback(this.findMatchingSuggestions(query).slice(0, 8));
  }

  findMatchingSuggestions = (query) =>
    this.suggestions.filter((suggestion) => suggestion.display.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  renderSuggestion = (suggestion, search, highlightedDisplay) => {
    const avatarUrl = `http://graph.facebook.com/${suggestion.id}/picture?type=square`;
    return (
      <div className="suggestion-item">
        <img src={avatarUrl} alt="Avatar" />
        <div className="suggestion-text">
          {highlightedDisplay}
          <div className="suggestion-type">Page</div>
        </div>
      </div>
    );
  }

  render() {
    const { placeholder, message, handleMessageChange, handleMessageBlur, hasBorder } = this.props;
    return (
      <Wrapper className={hasBorder ? 'hasBorder' : ''}>
        <MentionsInput
          allowSpaceInQuery
          onBlur={() => handleMessageBlur()}
          onChange={(e) => handleMessageChange(e.target.value)}
          placeholder={placeholder}
          style={style}
          value={message}
        >
          <Mention
            trigger="@"
            data={this.getFacebookEntities}
            style={mentionStyle}
            renderSuggestion={this.renderSuggestion}
          />
        </MentionsInput>
      </Wrapper>
    );
  }
}

export default MultiLineInputMentions;

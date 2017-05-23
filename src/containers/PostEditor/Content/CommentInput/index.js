import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import PPButton from 'elements/atm.Button';

import Wrapper from './Wrapper';

class CommentInput extends Component {
  static propTypes = {
    postComment: PropTypes.func,
    user: PropTypes.shape(),
  };

  state = { value: '' };

  onSend = () => {
    const { postComment } = this.props;
    postComment(this.state.value);
    this.setState({ value: '' });
  };

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { user } = this.props;
    const { value } = this.state;
    return (
      <Wrapper>
        <img
          className="avatar"
          src={user && user.properties.thumb_url}
          alt=""
        />
        <div className="input">
          <Input
            type="text"
            placeholder="Add a comment"
            multiline
            value={value}
            onChange={this.onChange}
          />
        </div>
        <div className="send-button">
          <PPButton
            label="Say It"
            className="add-button"
            onClick={this.onSend}
            primary
            disabled={!value}
          />
        </div>
      </Wrapper>
    );
  }
}

export default CommentInput;

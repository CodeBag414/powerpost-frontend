import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { browserHistory } from 'react-router';

import Wrapper from './Wrapper';
import Title from './Title';
import Subtitle from './Subtitle';

function handleTitleKeyDown(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.target.blur();
  }
}

function GeneralInfo({ user, postSet, blogName, handleTitleChange, handleTitleBlur, closeButtonHidden }) {
  const onBack = () => {
    browserHistory.goBack();
  };

  // const userName = postSet.user_id === user.user_id ? user.display_name : postSet.user.display_name;
  // const creationTime = moment.unix(postSet.creation_time).format('M/DD/YYYY hh:mma');

const creationTime = moment.unix().format('M/DD/YYYY hh:mma');
  return (
    <Wrapper>
      <div>
        <Title
          contentEditable
          onInput={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
        >
          {blogName}
        </Title>
        <br />
        <Subtitle>{`Created by aaa \u00a0\u00a0 | \u00a0\u00a0 ${creationTime}`}</Subtitle>
      </div>
      <button className="back-button" onClick={onBack}>
        ×
      </button>
    </Wrapper>
  );
}

GeneralInfo.propTypes = {
  user: PropTypes.shape(),
  postSet: PropTypes.object,
  blogName: PropTypes.string,
  handleTitleChange: PropTypes.func,
  handleTitleBlur: PropTypes.func,
  closeButtonHidden: PropTypes.bool,
};

export default GeneralInfo;

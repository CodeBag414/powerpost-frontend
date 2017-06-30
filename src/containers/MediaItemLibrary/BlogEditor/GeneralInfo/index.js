import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Wrapper from './Wrapper';
import Title from './Title';
import Subtitle from './Subtitle';

function handleTitleKeyDown(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.target.blur();
  }
}

function GeneralInfo({ user, postSet, blogName, handleTitleChange, handleTitleBlur, closeButtonHidden, onBack }) {
  const userName = user.display_name;
  const creationTime = moment().format('M/DD/YYYY hh:mma');

  return (
    <Wrapper>
      <div>
        <Title
          onInput={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
        >
          {blogName}
        </Title>
        <br />
        <Subtitle>{`Created by ${userName} \u00a0\u00a0 | \u00a0\u00a0 ${creationTime}`}</Subtitle>
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

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Wrapper from './Wrapper';
import Title from './Title';
import Subtitle from './Subtitle';

function GeneralInfo({ user, creationTime, blogName, onBack }) {
  const userName = user.display_name;
  const time = creationTime === 0 ? moment().format('M/DD/YYYY hh:mma') : moment(creationTime * 1000).format('M/DD/YYYY hh:mma');

  return (
    <Wrapper>
      <div>
        <Title>{blogName}</Title>
        <br />
        <Subtitle>{`Created by ${userName} \u00a0\u00a0 | \u00a0\u00a0 ${time}`}</Subtitle>
      </div>
      <button className="back-button" onClick={onBack}>
        ×
      </button>
    </Wrapper>
  );
}

GeneralInfo.propTypes = {
  user: PropTypes.shape(),
  blogName: PropTypes.string,
  creationTime: PropTypes.number,
  onBack: PropTypes.func,
};

export default GeneralInfo;

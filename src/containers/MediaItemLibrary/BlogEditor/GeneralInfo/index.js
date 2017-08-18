import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PPTextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';

import Wrapper from './Wrapper';
import Title from './Title';
import Subtitle from './Subtitle';
import { isEmpty } from 'lodash';

function GeneralInfo({ user, creationTime, blogName, onBack, handleInputChange, onSaveBlog, selectedItem, onUpdateBlog }) {
  const userName = user.display_name;
  const time = creationTime === 0 ? moment().format('M/DD/YYYY hh:mma') : moment(creationTime * 1000).format('M/DD/YYYY hh:mma');

  return (
    <Wrapper>
      <div style={{ width: '100%' }}>
        <PPTextField
          type="text"
          name="title"
          placeholder="Untitled"
          value={blogName || ''}
          onChange={(e) => handleInputChange('titleValue', e.target.value)}
          style={{ height: '50px', float: 'left', marginTop: '18px' }}
        />
        <Button
          primary
          label={isEmpty(selectedItem) ? 'Save Blog' : 'Update Blog'}
          onClick={isEmpty(selectedItem) ? onSaveBlog : onUpdateBlog}
          style={{ float: 'right', marginTop: '18px', marginRight: '50px' }}
        />
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

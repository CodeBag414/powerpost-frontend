import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { browserHistory } from 'react-router';

import StatusChooser from 'containers/PostEditor/StatusChooser';
import UserAssignment from 'containers/PostEditor/UserAssignment';

import Wrapper from './Wrapper';
import InnerWrapper from './InnerWrapper';
import Title from './Title';
import Subtitle from './Subtitle';

function handleTitleKeyDown(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.target.blur();
  }
}

function GeneralInfo({
  groupUsers,
  handleTitleChange,
  handleTitleBlur,
  location,
  modal,
  postSet,
  postTitle,
  updatePostSet,
  user,
  userAccount,
  permissionClasses,
}) {
  const onBack = () => {
    browserHistory.push(location.pathname);
  };

  const postSetObject = postSet.get('details').toJS();
  if (!postSetObject.post_set_id) return null;
  const userName = postSetObject.user_id === user.user_id ? user.display_name : postSetObject.user.display_name;
  const creationTime = moment.unix(postSetObject.creation_time).format('M/DD/YYYY hh:mma');
  return (
    <Wrapper modal={modal}>
      <div>
        <Title
          contentEditable={permissionClasses.title.indexOf('disabled') === -1 && permissionClasses.title.indexOf('read-only') === -1}
          onInput={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          className={permissionClasses.title}
        >
          {postTitle}
        </Title>
        <br />
        <Subtitle>{`Created by ${userName} \u00a0\u00a0 | \u00a0\u00a0 ${creationTime}`}</Subtitle>
      </div>
      <InnerWrapper>
        <UserAssignment
          isFetching={groupUsers.isFetching || postSet.get('isFetching')}
          postSet={postSet.get('details').toJS()}
          assignee={postSet.getIn(['details', 'user_assignments', 0])}
          users={groupUsers.details ? groupUsers.details.groups_users : []}
          updatePostSet={updatePostSet}
          className={permissionClasses.assignedTo}
        />
        <StatusChooser
          postSet={postSet}
          updatePostSet={updatePostSet}
          userAccount={userAccount}
          permissionClasses={permissionClasses}
        />
        {
          modal ? (
            <div className="back-button" onClick={onBack}>
              ×
            </div>
          ) : null
        }
      </InnerWrapper>
    </Wrapper>
  );
}

GeneralInfo.propTypes = {
  handleTitleBlur: PropTypes.func,
  handleTitleChange: PropTypes.func,
  groupUsers: PropTypes.object,
  location: PropTypes.object,
  postSet: PropTypes.object,
  postTitle: PropTypes.string,
  modal: PropTypes.bool,
  updatePostSet: PropTypes.func,
  user: PropTypes.shape(),
  userAccount: PropTypes.object,
  permissionClasses: PropTypes.object,
};

export default GeneralInfo;

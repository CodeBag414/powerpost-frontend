import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import Preview from 'components/Preview';

import Button from 'elements/atm.Button';

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  padding: 20px 40px;
  float: left;
  overflow: auto;
`;
const Content = styled.div`
  width: 400px;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  flex: 1;
  margin-right: 26px;
  color: #6F6F6F;
  font-size: 18px;
  word-break: break-all;
`;
const UserAndTime = styled.div`
  margin-top: 9px;
  font-size: 12px;
  line-height: 15px;
  color: #8C9496;
`;
const Message = styled.div`
  margin-top: 24px;
  margin-bottom: 21px;
  color: #616669;
  font-size: 12px;
  line-height: 15px;
`;

const PostSetDetail = ({
  owned,
  postSet,
  mediaItems,
  permissionClasses,
  handlePostSet,
}) => {
  let item;
  if (mediaItems.length === 0) {
    item = { type: 'empty' };
  } else {
    item = mediaItems.toJS()[0];
  }
  return (
    <Wrapper>
      <Content>
        <TitleRow>
          <Title>
            { postSet.get('title') }
          </Title>
          <Button
            primary
            onClick={() => handlePostSet(owned, postSet)}
            className={owned ? permissionClasses.removeFromStream : permissionClasses.addPost}
          >
            { owned ? 'Remove from Stream' : 'Add to Posts' }
          </Button>
        </TitleRow>
        <UserAndTime>
          created by { postSet.getIn(['user', 'display_name']) }
        </UserAndTime>
        <Message>
          { postSet.get('message') }
        </Message>
        <Preview
          item={item}
        />
      </Content>
    </Wrapper>);
};

PostSetDetail.propTypes = {
  owned: PropTypes.bool,
  postSet: ImmutablePropTypes.map,
  handlePostSet: PropTypes.func,
  permissionClasses: PropTypes.object,
  mediaItems: PropTypes.array,
};

PostSetDetail.defaultProps = {
  postSet: new Map(),
};

export default PostSetDetail;

/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import styled from 'styled-components';
import { MenuItem } from 'react-toolbox/lib/menu';

import Popup from './Popup';

const CustomMenuItem = styled(MenuItem)`
  width: 170px;
  height: 36px;

  i {
    color: #8C9496;
  }

  span {
    flex-grow: 0;
  }

  &:hover {
    background: #E81C64 !important;
    i {
      color: white !important;
    }
    div {
      color: white !important;
    }
  }
`;

const MenuItemCaption = styled.div`
  color: #8C9496;
  margin-left: 10px;
`;

class UnscheduledPost extends React.Component {

  static propTypes = {
    onDelete: React.PropTypes.func,
    post: React.PropTypes.object,
  };

  state = {
    menuVisible: false,
  };

  handleHidePopup = () => {
    this.setState({ menuVisible: false });
  }

  handleShowPopup = () => {
    this.setState({
      menuVisible: true,
    });
  }

  render() {
    const { post, onDelete } = this.props;
    const { menuVisible } = this.state;

    return (
      <div key={post.post.post_id} className={`cal-sidebar-unscheduled-item ${menuVisible && 'active'}`}>
        {post.post_set.title ? post.post_set.title : 'Untitled post'}
        <i className="fa fa-ellipsis-h" onClick={this.handleShowPopup} />
        {menuVisible &&
          <Popup onOutsideClick={this.handleHidePopup}>
            <CustomMenuItem onClick={() => onDelete(post)} >
              <i className="fa fa-trash" />
              <MenuItemCaption>Delete</MenuItemCaption>
            </CustomMenuItem>
          </Popup>
        }
      </div>
    );
  }
}

export default UnscheduledPost;

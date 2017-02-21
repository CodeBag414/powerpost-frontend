import React, { PropTypes, Component } from 'react';
import Avatar from 'material-ui/Avatar';

const PPAvatar= (props) => {
    
    return(
        <Avatar {...props} />
    );
};


PPAvatar.PropTypes = {
    backgroundColor: PropTypes.string, //		The backgroundColor of the avatar. Does not apply to image avatars.
    children: PropTypes.node, //			Can be used, for instance, to render a letter inside the avatar.
    className: PropTypes.string, //			The css class name of the root div or img element.
    color: PropTypes.string	, //		The icon or letter's color.
    icon: PropTypes.element, //			This is the SvgIcon or FontIcon to be used inside the avatar.
    size: PropTypes.number, //		40	This is the size of the avatar in pixels.
    src: PropTypes.string, //			If passed in, this component will render an img element. Otherwise, a div will be rendered.
    style: PropTypes.object, //			Override the inline-styles of the root element.
};

export default PPAvatar;
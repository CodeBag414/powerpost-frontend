import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';

const PPDialog = props => {
    return (
        <Dialog {...props } />
    );
};

PPDialog.PropTypes = {
    actions: PropTypes.node, //Action buttons to display below the Dialog content (children). This property accepts either a React element, or an array of React elements.
    actionsContainerClassName: PropTypes.string, //The className to add to the actions container's root element.
    actionsContainerStyle: PropTypes.object, //Overrides the inline-styles of the actions container's root element.
    autoDetectWindowHeight: PropTypes.bool, //true	If set to true, the height of the Dialog will be auto detected. A max height will be enforced so that the content does not extend beyond the viewport.
    autoScrollBodyContent: PropTypes.bool, //false If set to true, the body content of the Dialog will be scrollable.
    bodyClassName: PropTypes.string, //The className to add to the content's root element under the title.
    bodyStyle: PropTypes.object, //Overrides the inline-styles of the content's root element under the title.
    children: PropTypes.node, //The contents of the Dialog.
    className: PropTypes.string, //The css class name of the root element.
    contentClassName: PropTypes.string, //The className to add to the content container.
    contentStyle: PropTypes.object, //Overrides the inline-styles of the content container.
    modal: PropTypes.bool, //false  Force the user to use one of the actions in the Dialog. Clicking outside the Dialog will not trigger the onRequestClose.
    onRequestClose: PropTypes.func, //Fired when the Dialog is requested to be closed by a click outside the Dialog or on the buttons. Signature: function(buttonClicked: bool) => void, buttonClicked: Determines whether a button click triggered this request.
    open: PropTypes.bool.isRequired, //Controls whether the Dialog is opened or not.
    overlayClassName: PropTypes.string, //The className to add to the Overlay component that is rendered behind the Dialog.
    overlayStyle: PropTypes.object, //Overrides the inline-styles of the Overlay component that is rendered behind the Dialog.
    repositionOnUpdate: PropTypes.bool, //true	Determines whether the Dialog should be repositioned when it's contents are updated.
    style: PropTypes.object, //Override the inline-styles of the root element.
    title: PropTypes.node, //The title to display on the Dialog. Could be number, string, element or an array containing these types.
    titleClassName: PropTypes.string, //The className to add to the title's root container element.
    titleStyle: PropTypes.object, //Overrides the inline-styles of the title's root container element.
};

export default PPDialog;


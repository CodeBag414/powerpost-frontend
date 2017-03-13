import React from 'react';
import {connect} from 'react-redux';

import PPRaisedButton from 'App/shared/atm.RaisedButton';
//import Dialog from 'App/shared/atm.Dialog';

class AddConnectionDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const actions = [
            <PPRaisedButton label="Cancel" primary={true} onTouchTap={ this.props.handleDialogToggle }/>,
            <PPRaisedButton label="Connect" secondary={true} keyboardFocused={true}
                    onTouchTap={ this.props.handleDialogToggle }/>
        ];

        return (
            <div>
            </div>
        );
    }
}

AddConnectionDialog.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(AddConnectionDialog);

import React from 'react';
import {connect} from 'react-redux';

import Button from 'App/shared/atm.Button';
import Dialog from 'App/shared/atm.Dialog';

class AddConnectionDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const actions = [
            <Button label="Cancel" primary={true} onTouchTap={ this.props.handleDialogToggle }/>,
            <Button label="Connect" secondary={true} keyboardFocused={true}
                    onTouchTap={ this.props.handleDialogToggle }/>
        ];

        return (
            <div>
                <Dialog
                    title="Add Connection"
                    actions={actions}
                    modal={false}
                    open={this.props.dialogShown}
                    onRequestClose={ this.props.handleDialogToggle }
                >
                </Dialog>
            </div>
        );
    }
}

AddConnectionDialog.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(AddConnectionDialog);

import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AddConnectionDialog from './views/AddConnectionDialog';
import ConnectionsControlBar from './views/ConnectionsControlBar';
import ConnectionsList from './views/ConnectionsList';

import {
    setConnectionsList,
    toggleDialog
} from './state/actions';

import {
    makeSelectConnections,
    makeSelectDialogShown
} from './state/selectors';

class Connections extends React.Component {
    constructor(props) {
        super(props);
        this.props.setConnectionsListShown(require('./connections.json').connections);
        this.handleDialogToggle = this.handleDialogToggle.bind(this);
    }

    handleDialogToggle() {
        this.props.toggleDialogShown(!this.props.dialogShown);
    }

    render() {
        return (
            <div className="container">
                <ConnectionsControlBar handleDialogToggle={ this.handleDialogToggle }/>
                <ConnectionsList connections={ this.props.connections }/>
                <AddConnectionDialog handleDialogToggle={ this.handleDialogToggle }
                                     dialogShown={ this.props.dialogShown }/>
            </div>
        );
    }
}

Connections.propTypes = {children: React.PropTypes.node};

export function mapDispatchToProps(dispatch) {
    return {
        setConnectionsListShown: connections => dispatch(setConnectionsList(connections)),
        toggleDialogShown: isShown => dispatch(toggleDialog(isShown))
    };
}

const mapStateToProps = createStructuredSelector({
    connections: makeSelectConnections(),
    dialogShown: makeSelectDialogShown()
});

export default connect(mapStateToProps, mapDispatchToProps)(Connections);

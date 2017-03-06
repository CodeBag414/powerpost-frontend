import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AddConnectionDialog from './views/AddConnectionDialog';
import ConnectionsControlBar from './views/ConnectionsControlBar';
import ConnectionsList from './views/ConnectionsList';

import {
    setChannelFilter,
    setConnectionsList,
    toggleDialog
} from './state/actions';

import {
    makeSelectChannelFilter,
    makeSelectConnections,
    makeSelectDialogShown
} from './state/selectors';

class Connections extends React.Component {
    constructor(props) {
        super(props);
        this.props.setConnectionsListShown(require('./connections.json').connections);
        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.setChannelFilter = this.setChannelFilter.bind(this);
    }

    handleDialogToggle() {
        this.props.toggleDialogShown(!this.props.dialogShown);
    }

    setChannelFilter(channelFilter) {
        this.props.setChannelFilter(channelFilter);
    }

    getFilteredConnections () {
        return this.props.connections.filter(connection => {
            let matched = true;

            if(this.props.channelFilter) {
                matched = matched && (connection.display_name.toLowerCase().indexOf(this.props.channelFilter.toLowerCase()) > -1);
            }

            return matched;
        });
    }

    render() {
        return (
            <div className="container">
                <ConnectionsControlBar handleDialogToggle={ this.handleDialogToggle }
                                       setChannelFilter={ this.setChannelFilter }/>
                <ConnectionsList connections={ this.getFilteredConnections() }/>
                <AddConnectionDialog handleDialogToggle={ this.handleDialogToggle }
                                     dialogShown={ this.props.dialogShown }/>
            </div>
        );
    }
}

Connections.propTypes = {children: React.PropTypes.node};

export function mapDispatchToProps(dispatch) {
    return {
        setChannelFilter: channelFilter => dispatch(setChannelFilter(channelFilter)),
        setConnectionsListShown: connections => dispatch(setConnectionsList(connections)),
        toggleDialogShown: isShown => dispatch(toggleDialog(isShown))
    };
}

const mapStateToProps = createStructuredSelector({
    channelFilter: makeSelectChannelFilter(),
    connections: makeSelectConnections(),
    dialogShown: makeSelectDialogShown()
});

export default connect(mapStateToProps, mapDispatchToProps)(Connections);

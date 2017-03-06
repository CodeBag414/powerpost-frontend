import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AddConnectionDialog from './components/AddConnectionDialog';
import ConnectionsControlBar from './components/ConnectionsControlBar';
import ConnectionsList from './components/ConnectionsList';

import {
    setChannelFilter,
    setChannelType,
    setConnectionsList,
    toggleDialog
} from './state/actions';

import {
    makeSelectChannelFilter,
    makeSelectChannelType,
    makeSelectConnections,
    makeSelectDialogShown
} from './state/selectors';

class Connections extends React.Component {
    constructor(props) {
        super(props);
        //this.props.setConnectionsListShown(require('./connections.json').connections);
        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.removeConnection = this.removeConnection.bind(this);
        this.setChannelFilter = this.setChannelFilter.bind(this);
        this.setChannelType = this.setChannelType.bind(this);
    }

    handleDialogToggle() {
        this.props.toggleDialogShown(!this.props.dialogShown);
    }

    removeConnection(connectionId) {
        let connections = this.props.connections.slice(), connectionIndex;

        connections.forEach((connection, index) => {
            if(connection.connection_id === connectionId) {
                connectionIndex = index;
            }
        });

        if(connectionIndex !== undefined) {
            connections.splice(connectionIndex, 1);
        }

        this.props.setConnectionsListShown(connections);
    }

    setChannelFilter(channelFilter) {
        this.props.setChannelFilter(channelFilter);
    }

    setChannelType(channelType) {
        this.props.setChannelType(channelType);
    }

    getFilteredConnections () {
        return this.props.connections.filter(connection => {
            let matched = true;

            if(this.props.channelFilter) {
                matched = matched && (connection.display_name.toLowerCase().indexOf(this.props.channelFilter.toLowerCase()) > -1);
            }

            if(this.props.channelType) {
                matched = matched && (connection.channel === this.props.channelType);
            }

            return matched;
        });
    }

    getChannelTypes () {
        let types = [];

        this.props.connections.forEach(connection => {
            if(types.indexOf(connection.channel) === -1) {
                types.push(connection.channel);
            }
        });

        types.sort();
        return types;
    }

    render() {
        return (
            <div className="container">
                <ConnectionsControlBar handleDialogToggle={this.handleDialogToggle} channels={this.getChannelTypes()}
                                       setChannelFilter={this.setChannelFilter} setChannelType={this.setChannelType}
                                       channelFilter={this.props.channelFilter} channelType={this.props.channelType} />
                <ConnectionsList connections={this.getFilteredConnections()} removeConnection={this.removeConnection}/>
                <AddConnectionDialog handleDialogToggle={this.handleDialogToggle} dialogShown={this.props.dialogShown}/>
            </div>
        );
    }
}

Connections.propTypes = {children: React.PropTypes.node};

export function mapDispatchToProps(dispatch) {
    return {
        setChannelFilter: channelFilter => dispatch(setChannelFilter(channelFilter)),
        setChannelType: channelType => dispatch(setChannelType(channelType)),
        setConnectionsListShown: connections => dispatch(setConnectionsList(connections)),
        toggleDialogShown: isShown => dispatch(toggleDialog(isShown))
    };
}

const mapStateToProps = createStructuredSelector({
    channelFilter: makeSelectChannelFilter(),
    channelType: makeSelectChannelType(),
    connections: makeSelectConnections(),
    dialogShown: makeSelectDialogShown()
});

export default connect(mapStateToProps, mapDispatchToProps)(Connections);

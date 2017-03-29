import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanConnections } from 'config.routes/UserRoutePermissions';

import AddConnectionDialog from './AddConnectionDialog';
import ConnectionsControlBar from './ConnectionsControlBar';
import ConnectionsList from './ConnectionsList';

import {
    setChannelFilter,
    setChannelType,
    setConnectionsList,
    toggleDialog,
    getSocialUrl,
    removeConnection,
    connectionCallback,
} from './actions';


import {
    makeSelectChannelFilter,
    makeSelectChannelType,
    makeSelectDialogShown,
    makeSelectSocialUrls,
} from './selectors';

import {
    makeSelectAccountConnections,
} from 'containers/Main/selectors';


class Connections extends React.Component {
    constructor(props) {
        super(props);
        //this.props.setConnectionsListShown(require('./connections.json').connections);
        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.removeConnection = this.removeConnection.bind(this);
        this.setChannelFilter = this.setChannelFilter.bind(this);
        this.setChannelType = this.setChannelType.bind(this);
    }
    
    componentDidMount() {
        this.props.getSocialUrl();
        window.addEventListener("message", receiveMessage.bind(this), false);

        function receiveMessage(event)
        {
            console.log(event.origin);
            //this.props.connectionCallback(event.data);
        }
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
        this.props.removeChannel(connectionId);
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
            <div>
                <ConnectionsControlBar handleDialogToggle={this.handleDialogToggle} channels={this.getChannelTypes()}
                                       setChannelFilter={this.setChannelFilter} setChannelType={this.setChannelType}
                                       channelFilter={this.props.channelFilter} channelType={this.props.channelType} />
                <ConnectionsList connections={this.getFilteredConnections()} removeConnection={this.removeConnection}/>
                <AddConnectionDialog handleDialogToggle={this.handleDialogToggle} dialogShown={this.props.dialogShown} socialUrls={ this.props.socialUrls }/>
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
        toggleDialogShown: isShown => dispatch(toggleDialog(isShown)),
        getSocialUrl: () => dispatch(getSocialUrl()),
        removeChannel: (channelId) => dispatch(removeConnection(channelId)),
        connectionCallback: (channelObject) => dispatch(connectionCallback(channelObject)),
    };
}

const mapStateToProps = createStructuredSelector({
    channelFilter: makeSelectChannelFilter(),
    channelType: makeSelectChannelType(),
    connections: makeSelectAccountConnections(),
    dialogShown: makeSelectDialogShown(),
    socialUrls: makeSelectSocialUrls(),
});

export default UserCanConnections(connect(mapStateToProps, mapDispatchToProps)(Connections));

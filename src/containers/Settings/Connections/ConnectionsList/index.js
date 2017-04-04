import React from 'react';


import ConnectionsListItem from './ConnectionsListItem';

class ConnectionsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let connectionsList;

        if((this.props.connections !== undefined) && (this.props.connections.length > 0)) {
            connectionsList = [];

            this.props.connections.map((connection, index) => {
                connectionsList.push(
                    <ConnectionsListItem key={index} connection={connection} remove={this.props.removeConnection}/>
                );
            });
        } else {
            connectionsList = 'You currently have no connections';
        }

        return (
            <div>
                { connectionsList }
            </div>
        );
    }
}

ConnectionsList.propTypes = {
    children: React.PropTypes.node
};

export default ConnectionsList;

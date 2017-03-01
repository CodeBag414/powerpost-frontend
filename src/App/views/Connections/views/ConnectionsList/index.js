import React from 'react';
import {connect} from 'react-redux';

import ConnectionsListItem from './views/ConnectionsListItem';

class ConnectionsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let connectionsList;

        if((this.props.connections !== undefined) && (this.props.connections.length > 0)) {
            connectionsList = [];

            this.props.connections.map((connection, index) => {
                connectionsList.push(<ConnectionsListItem key={index} connection={ connection } />)
            });
        } else {
            connectionsList = 'You currently have no connections';
        }

        return (
            <div className="row">
                { connectionsList }
            </div>
        );
    }
}

ConnectionsList.propTypes = {
    children: React.PropTypes.node
};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(ConnectionsList);

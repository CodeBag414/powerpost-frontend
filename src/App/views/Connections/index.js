import React from 'react';
import {connect} from 'react-redux';

import ConnectionsControlBar from './views/ConnectionsControlBar';
import ConnectionsList from './views/ConnectionsList';

class Connections extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <ConnectionsControlBar />
                <ConnectionsList />
            </div>
        );
    }
}

Connections.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(Connections);

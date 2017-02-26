import React from 'react';
import {connect} from 'react-redux';

class ConnectionsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                You currently have no connections
            </div>
        );
    }
}

ConnectionsList.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(ConnectionsList);

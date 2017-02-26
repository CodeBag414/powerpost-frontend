import React from 'react';
import {connect} from 'react-redux';

import AddConnectionDialog from './views/AddConnectionDialog';
import ConnectionsControlBar from './views/ConnectionsControlBar';
import ConnectionsList from './views/ConnectionsList';

class Connections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dialogShown: false};
        this.handleDialogToggle = this.handleDialogToggle.bind(this);
    }

    handleDialogToggle() {
        this.setState({dialogShown: !this.state.dialogShown});
    }

    render() {
        return (
            <div className="container">
                <ConnectionsControlBar handleDialogToggle={ this.handleDialogToggle }/>
                <ConnectionsList />
                <AddConnectionDialog handleDialogToggle={ this.handleDialogToggle }
                                     dialogShown={ this.state.dialogShown }/>
            </div>
        );
    }
}

Connections.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(Connections);

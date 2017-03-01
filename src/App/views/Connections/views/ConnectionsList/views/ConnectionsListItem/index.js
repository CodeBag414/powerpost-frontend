import React from 'react';
import {connect} from 'react-redux';

class ConnectionsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                    <i className={ this.props.connection.channel_icon }></i>
                </div>
                <div className="col-xs-8 col-sm-8 col-md-10 col-lg-10">
                    { this.props.connection.display_name }
                </div>
            </div>
        );
    }
}

ConnectionsListItem.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(ConnectionsListItem);

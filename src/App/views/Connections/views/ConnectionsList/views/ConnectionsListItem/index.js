import React from 'react';
import {connect} from 'react-redux';

class ConnectionsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    getChannelClass(styles) {
        return styles.hasOwnProperty(this.props.connection.channel) ? styles[this.props.connection.channel] : '';
    }

    getType() {
        return this.props.connection.type.split('_')[1];
    }

    getStatusLabel(styles) {
        switch(this.props.connection.status) {
            case '1': return <div className={styles.enabledLabel}>Enabled</div>;
            case '3': return <div className={styles.disconnectedLabel}><i className="fa fa-warning"></i> Reconnect</div>;
            default: return <div className={styles.disabledLabel}>Disabled</div>;
        }
    }

    render() {
        const styles = require('./styles.scss');

        return (
            <div className={styles.connectionBlock}>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <span className={styles.connectionName}>{ this.props.connection.display_name }</span>
                        <span className={this.getChannelClass(styles)}>
                            <i className={this.props.connection.channel_icon}></i>
                            <span className={styles.connectionType}>{this.getType()}</span>
                        </span>
                    </div>
                    <div className={['col-xs-8', 'col-sm-8', 'col-md-8', 'col-lg-8'].join(' ')}>
                        <div className={styles.controlBlock}>
                            {this.getStatusLabel(styles)}
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
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

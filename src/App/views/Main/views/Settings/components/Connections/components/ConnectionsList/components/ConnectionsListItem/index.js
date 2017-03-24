import React from 'react';
import FontIcon from 'App/shared/atm.FontIcon';

class ConnectionsListItem extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    getChannelClass(styles) {
        return styles.hasOwnProperty(this.props.connection.channel) ? styles[this.props.connection.channel] : '';
    }

    getType() {
        return this.props.connection.type.split('_')[1];
    }

    getStatusLabel(styles) {
        switch(this.props.connection.status) {
            case '3': return <div className={styles.disconnectedLabel}><i className="fa fa-warning"></i> Reconnect</div>;
        }
    }

    remove () {
        this.props.remove(this.props.connection.connection_id);
    }

    render() {
        const styles = require('./styles.scss');

        return (
            <div className={styles.connectionBlock}>
                <div>
                    <div className={ styles.connectionIcon }>
                        <i className={ this.props.connection.channel_icon + ' ' + this.getChannelClass(styles)}></i>
                    </div>
                    <div style={{ float: 'left' }}>
                        <div className={styles.connectionName}>{ this.props.connection.display_name }</div>
                        <div className={this.getChannelClass(styles)}>{this.getType()[0].toUpperCase() + this.getType().slice(1)}</div>
                    </div>
                    <div>
                        <div className={[styles.controlBlock, styles.removeBlock].join(' ')} onClick={this.remove}>
                            <div><FontIcon value="clear"></FontIcon></div>
                            <div>Remove</div>
                        </div>
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

export default ConnectionsListItem;

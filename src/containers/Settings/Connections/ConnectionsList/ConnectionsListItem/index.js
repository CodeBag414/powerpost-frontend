import React from 'react';
import FontIcon from 'elements/atm.FontIcon';
import PPButton from 'elements/atm.Button';

class ConnectionsListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            primary: this.props.primary,
        };
        
        this.remove = this.remove.bind(this);
    }

    getChannelClass(styles) {
        return styles.hasOwnProperty(this.props.connection.channel) ? styles[this.props.connection.channel] : '';
    }

    getType() {
        return this.props.channelType ? this.props.channelType : this.props.connection.type.split('_')[1];
    }

    getStatusLabel(styles) {
        switch(this.props.connection.status) {
            case '3': return <div className={styles.disconnectedLabel}><i className="fa fa-warning"></i> Reconnect</div>;
        }
    }

    remove() {
        this.props.remove(this.props.connection.connection_id);
    }
    
    toggleConnection(connection) {
        this.setState({ primary: !this.state.primary });
        this.props.toggleConnection(connection);
    }
    
    render() {
        const styles = require('./styles.scss');
        if(this.props.connectionIcons) {
            this.props.connection.channel_icon = this.props.connectionIcons;
        }
        return (
            <div>
            {!this.props.hidden &&
            <div className={styles.connectionBlock}>
                <div>
                    <div className={ styles.connectionIcon }>
                        <i className={ this.props.connection.channel_icon + ' ' + this.getChannelClass(styles)}></i>
                    </div>
                    <div style={{ float: 'left' }}>
                        <div className={styles.connectionName}>{ this.props.connection.display_name || this.props.connection.blogName }</div>
                        {!this.props.connection.blogName &&
                            <div className={this.getChannelClass(styles)}>{this.getType()[0].toUpperCase() + this.getType().slice(1)}</div>
                        }
                    </div>
                    {!this.props.subChannel &&
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
                    }
                    {this.props.subChannel && 
                        <div>
                            <div className={styles.controlBlock}>
                                <PPButton label='Enable' primary={this.state.primary} onClick={() => this.toggleConnection(this.props.connection)} />
                            </div>
                            <div style={{clear: 'both'}}></div>                      
                        </div>
                    }
                </div>
            </div>
            }
            </div>
        );
    }
}

ConnectionsListItem.propTypes = {
    children: React.PropTypes.node
};

export default ConnectionsListItem;

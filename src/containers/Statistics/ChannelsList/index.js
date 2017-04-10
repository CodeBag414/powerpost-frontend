import React from 'react';


import ChannelsListItem from './ChannelsListItem';
import ConnectionsControlBar from '../ConnectionsControlBar';
import TabLink from 'elements/atm.TabLink';

class ChannelsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let connectionsList;

        if((this.props.connections !== undefined) && (this.props.connections.length > 0)) {
            connectionsList = [];
            
            this.props.connections.map((connection, index) => {
                connectionsList.push(
                    <TabLink style={{ display: 'block', 'padding-top':'0px', 'padding-bottom':'0px' }} to={ '/account/' + this.props.accountId + '/statistics/' + connection.connection_id } key={index}>
                        <ChannelsListItem connection={connection}/>
                    </TabLink>
                );
            });
        } else {
            connectionsList = 'You currently have no connections';
        }

        return (
            <div>
                <div className={ ['col-xs-3', 'col-sm-3', 'col-md-3'].join(' ') }>
                    <ConnectionsControlBar handleDialogToggle={ this.props.handleDialogToggle } channels={ this.props.channels }
                                           setChannelFilter={ this.props.setChannelFilter } setChannelType={ this.props.setChannelType }
                                           channelFilter={ this.props.channelFilter } channelType={ this.props.channelType } />
                    { connectionsList }
                </div>
                <div className={ ['col-xs-9', 'col-sm-9', 'col-md-9'].join(' ') } style={{ 'background-color': '#f3f3f3', 'min-height': '100vh' }}>
                    { this.props.loading }
                </div>
            </div>
        );
    }
}

ChannelsList.propTypes = {
    children: React.PropTypes.node,
    accountId: React.PropTypes.string,
    loading: React.PropTypes.any,
};

export default ChannelsList;

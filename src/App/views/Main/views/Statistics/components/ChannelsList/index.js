import React from 'react';


import ChannelsListItem from './components/ChannelsListItem';
import TabLink from 'App/shared/atm.TabLink';

class ConnectionsList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let connectionsList;
        console.log('link to:' + this.props.accountId);
        if((this.props.connections !== undefined) && (this.props.connections.length > 0)) {
            connectionsList = [];

            this.props.connections.map((connection, index) => {
                connectionsList.push(
                    <TabLink style={{ display: 'block', 'padding-top':'0px', 'padding-bottom':'0px' }} to={ '/account/' + this.props.accountId + '/statistics/channelsid' } key={index}>
                        <ChannelsListItem connection={connection}/>
                    </TabLink>
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
    children: React.PropTypes.node,
    accountId: React.PropTypes.string,
};

export default ConnectionsList;

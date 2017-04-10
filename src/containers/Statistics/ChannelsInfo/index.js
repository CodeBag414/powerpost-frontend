import React from 'react';
import TabLink from 'elements/atm.TabLink';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentChannel } from './selectors';
import {
    fetchCurrentChannel,
    fetchCurrentChannelSuccess,
} from './actions';

import styles from './styles.scss';

class ChannelsInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.activeChannel != this.props.activeChannel) {
            this.props.fetchChannelInfo(nextProps.activeChannel);
        }
    }
    
    render() {
        const channelId = this.props.params.channel_id;
        this.props.fetchChannel(channelId);

        return (
            <div>
                <div className={ styles.basicInfo }>
                    <table className={ styles.tablewidth }>
                        <tbody>
                            <th className={ styles.borderright }><h4></h4>Channel Name</th>
                            <th className={ styles.borderright }><h4>868</h4>Tweets</th>
                            <th className={ styles.borderright }><h4>1356</h4>Followers</th>
                            <th className={ styles.borderright }><h4>387</h4>Following</th>
                            <th><h4>254</h4>Favorites</th>
                        </tbody>
                    </table>
                </div>
                <div className={ styles.channelsinfo }>
                    <h3 className={ styles.paddingleft }>Engagement</h3>
                    <div className={ styles.infoTab }>
                        <TabLink to={ '/account/' + this.props.params.account_id + '/statistics/' + this.props.params.channel_id + '/tweets' } label="Tweets" />
                        <TabLink to={ '/account/' + this.props.params.account_id + '/statistics/' + this.props.params.channel_id + '/retweets'} label="Retweets" />
                        <TabLink to={ '/account/' + this.props.params.account_id + '/statistics/' + this.props.params.channel_id + '/favorites' } label="Favorites" />
                        <TabLink to={ '/account/' + this.props.params.account_id + '/statistics/' + this.props.params.channel_id + '/weekly' } label="Weekly" />
                        <TabLink to={ '/account/' + this.props.params.account_id + '/statistics/' + this.props.params.channel_id + '/monthly' } label="Monthly" />
                    </div>
                    <div>
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}
ChannelsInfo.propTypes = {
    children: React.PropTypes.node
};

function mapDispatchToProps(dispatch) {
  return {
    fetchChannel: (channelId) => dispatch(fetchCurrentChannel(channelId)),
    fetchChannelInfo: (channel) => dispatch(fetchCurrentChannelSuccess(channel)),
  };
}

const mapStateToProps = createStructuredSelector({
    activeChannel: makeSelectCurrentChannel(),
});

export default (connect(mapStateToProps, mapDispatchToProps)(ChannelsInfo));
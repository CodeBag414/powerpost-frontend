import React from 'react';
import {
    BarChart,
    Bar, 
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentChannel } from '../selectors';

import TopTweetListItem from './TopTweetlistItem';
import TopFaceListItem from './TopFacelistItem';
import TopPinListItem from './TopPinlistItem';
import TopPostListItem from './TopPostlistItem';

class ReTweets extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const data = [
              {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
              {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
              {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
              {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
              {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
              {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
              {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
        ];
        const channelInfo = this.props.activeChannel.analytics;
        console.log("channel Info from activeChannel: " + channelInfo.pins_by_weeks_ago);
        console.log("channel Info from activeChannel: " + this.props.activeChannel.connection.channel);
        let TopTweetsList;
        if(channelInfo != undefined) {
            TopTweetsList = [];
            switch(this.props.activeChannel.connection.channel){
                case 'pinterest':
                    for(var i in channelInfo.pins_by_weeks_ago) {
                        channelInfo.pins_by_weeks_ago[i].top_pins_by_engagement.map((topPin, index) => {
                            TopTweetsList.push(
                                <TopPinListItem topTweet={topPin} key={index} />
                            );
                        });
                    }
                    break;
                case 'twitter':
                    for(i in channelInfo.tweets_by_weeks_ago) {
                        channelInfo.tweets_by_weeks_ago[i].top_tweets_by_engagement.map((topTweet, index) => {
                            TopTweetsList.push(
                                <TopTweetListItem topTweet={topTweet} key={index} />
                            );
                        });
                    }
                    break;
                case 'linkedin':
                    for(i in channelInfo.posts_by_weeks_ago) {
                        channelInfo.posts_by_weeks_ago[i].top_posts_by_engagement.map((topPost, index) => {
                            TopTweetsList.push(
                                <TopPostListItem topTweet={topPost} key={index} />
                            );
                        });
                    }
                    break;
                case 'facebook':
                    for(i in channelInfo.posts_by_weeks_ago) {
                        channelInfo.posts_by_weeks_ago[i].top_posts_by_engagement.map((topPost, index) => {
                            TopTweetsList.push(
                                <TopFaceListItem topTweet={topPost} key={index} />
                            );
                        });
                    }
                    break;
                default:
                    TopTweetsList = "You Currently have no Channels.";
                    break;
            }
        }
        
        return (
            <div>
                <h3>In this ReTweets View</h3>
                <div className={['col-md-4', 'col-sm-4', 'col-xs-4'].join(' ')}>
                    <h1><b>4,873</b></h1>
                    <h5>Retweets this week</h5><br/>
                    <h5>Based on 37tweets sent in the last week you averaged <b>131 retweets </b>per post.</h5>
                </div>
                <div className={['col-md-8', 'col-sm-8', 'col-xs-8'].join(' ')}>
                    <BarChart width={600} height={200} data={data} margin={{top: 5, right: 30, left: 20, bottom: 1}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Bar dataKey="pv" fill="#dfdfdf" />
                        <Bar dataKey="uv" fill="#dfdfdf" />
                    </BarChart>
                </div>
                <div>
                    { TopTweetsList }
                </div>
            </div>
        );
    }
}

ReTweets.propTypes = {
    children: React.PropTypes.node
};

const mapStateToProps = createStructuredSelector({
    activeChannel: makeSelectCurrentChannel(),
});

export default (connect(mapStateToProps)(ReTweets));
import React from 'react';

class TopTweetListItem extends React.Component {
    render() {
        return (
            <div>
                <h3>In this TopTweetListItem View</h3>
            </div>
        );
    }
}

TopTweetListItem.propTypes = {
    children: React.PropTypes.node,
};
export default TopTweetListItem;
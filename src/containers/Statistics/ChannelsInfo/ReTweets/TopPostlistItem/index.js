import React from 'react';

class TopPostListItem extends React.Component {
    render() {
        return (
            <div>
                <h3>In this TopPostListItem View</h3>
            </div>
        );
    }
}

TopPostListItem.propTypes = {
    children: React.PropTypes.node,
};

export default TopPostListItem;
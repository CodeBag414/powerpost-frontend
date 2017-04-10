import React from 'react';

class TopPinListItem extends React.Component {
    render() {
        return (
            <div>
                <h3>In this TopPinListItem View</h3>
            </div>
        );
    }
}

TopPinListItem.propTypes = {
    children: React.PropTypes.node,
};
export default TopPinListItem;
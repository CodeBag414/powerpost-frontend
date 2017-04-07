import React from 'react';

class TopFaceListItem extends React.Component {
    render() {
        return (
            <div>
                <h3>In this TopFaceListItem View</h3>
            </div>
        );
    }
}

TopFaceListItem.propTypes = {
    children: React.PropTypes.node,
};
export default TopFaceListItem;
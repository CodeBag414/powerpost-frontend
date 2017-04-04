import React from 'react';
import Loading from 'react-loading';

class ChannelLoading extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
            <div style={{ 'text-align': 'center' }}>
                <h3>We are crunching the numbers!</h3>
                <div style={{ 'margin': 'auto', display: 'inline-block' }}>
                    <Loading type='spin' color='#ff0000' />
                </div>
            </div>
        );
    }
}
ChannelLoading.propTypes = {
    children: React.PropTypes.node
};
    
export default ChannelLoading;
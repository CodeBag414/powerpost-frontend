import React from 'react';

export default class Loading extends React.Component {

    render() {
        const styles = require('./styles.scss');
        
        return (
            <div className={ styles.loadingOverlay }>
                <h1>Loading...</h1>
            </div>
        );
    }
}
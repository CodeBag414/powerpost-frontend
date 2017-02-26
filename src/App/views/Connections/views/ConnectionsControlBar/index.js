import React from 'react';
import {connect} from 'react-redux';

import Button from 'App/shared/atm.Button';

class ConnectionsControlBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = require('./styles.scss');

        return (
            <div className="row">
                <div
                    className={ ['col-xs-12', 'col-sm-6', 'col-md-5', 'col-lg-4', styles.noLeftPadding].join(' ') }>
                    <h3 className={ [styles.noMargin].join(' ') }>Connected Accounts</h3>
                </div>
                <div
                    className={ ['col-xs-12', 'col-sm-4', 'col-md-4', 'col-lg-3', styles.noLeftPadding].join(' ') }>
                    <Button label="Connect a New Channel" secondary={ true }/>
                </div>
            </div>
        );
    }
}

ConnectionsControlBar.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(ConnectionsControlBar);

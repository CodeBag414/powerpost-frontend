import React from 'react';
import {connect} from 'react-redux';

import Button from 'App/shared/atm.Button';
import TextField from 'App/shared/atm.TextField';

class ConnectionsControlBar extends React.Component {
    constructor(props) {
        super(props);
        this.setChannelFilter = this.setChannelFilter.bind(this);
    }

    setChannelFilter(e) {
        this.props.setChannelFilter(e.target.value);
    }

    render() {
        const styles = require('./styles.scss');

        return (
            <div className="row">
                <div
                    className={ ['col-xs-12', 'col-sm-4', 'col-md-3', 'col-lg-3', styles.noLeftPadding].join(' ') }>
                    <h3 className={ [styles.noMargin].join(' ') }>Connected Accounts</h3>
                </div>
                <div
                    className={ ['col-xs-12', 'col-sm-4', 'col-md-4', 'col-lg-3', styles.noLeftPadding].join(' ') }>
                    <Button label="Connect a New Channel" secondary={ true } onClick={ this.props.handleDialogToggle } />
                </div>
                <div
                    className={ ['col-xs-12', 'col-sm-3', 'col-md-3', 'col-lg-2', styles.noLeftPadding].join(' ') }>
                    <TextField type="text" hintText="Find Channel" onChange={ this.setChannelFilter } underlineShow ={ false    }/>
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

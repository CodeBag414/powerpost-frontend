import React from 'react';
import {connect} from 'react-redux';

import PPRaisedButton from 'App/shared/atm.RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'App/shared/atm.SelectField';
import PPInput from 'App/shared/atm.Input';

class ConnectionsControlBar extends React.Component {
    constructor(props) {
        super(props);
        this.setChannelFilter = this.setChannelFilter.bind(this);
        this.setChannelType = this.setChannelType.bind(this);
    }

    setChannelFilter(e) {
        this.props.setChannelFilter(e.target.value);
    }

    setChannelType(event, index, value) {
        this.props.setChannelType(value);
    }

    render() {
        const styles = require('./styles.scss');

        let channelTypes = [<MenuItem value="" primaryText="All Types" key="" />];
        this.props.channels.forEach(channel => {
            channelTypes.push(<MenuItem value={channel} primaryText={channel} key={channel} />);
        });

        return (
            <div className={['row', styles.mainBlock].join(' ')}>
                <div
                    className={ ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-3', styles.noLeftPadding].join(' ') }>
                    <h3 className={ [styles.noMargin].join(' ') }>Connected Accounts</h3>
                </div>
                <div
                    className={ ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-3', styles.noLeftPadding].join(' ') }>
                    <PPRaisedButton label="Connect a New Channel" secondary={ true } onClick={ this.props.handleDialogToggle } />
                </div>
                <div
                    className={ ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-3', styles.noLeftPadding].join(' ') }>
                    <div className={[styles.filterBlock, styles.channelTypeBlock].join(' ')}>
                        <SelectField onChange={this.setChannelType} value={this.props.channelType} underlineShow={false}>
                            { channelTypes }
                        </SelectField>
                    </div>
                </div>
                <div
                    className={ ['col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-3', styles.noLeftPadding].join(' ') }>
                    <div className={[styles.filterBlock, styles.channelFilterBlock].join(' ')}>
                        <i className={['fa', 'fa-search', styles.channelFilterIcon].join(' ')}></i>
                        <PPInput value={ this.props.channelFilter } type="text" hintText="Find Channel"
                                   onChange={ this.setChannelFilter } underlineShow ={ false }/>
                    </div>
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

import React from 'react';
import {connect} from 'react-redux';

import PPButton from 'App/shared/atm.Button';
import MenuItem from 'material-ui/MenuItem';
import PPSelectField from 'App/shared/atm.SelectField';
import PPInput from 'App/shared/atm.Input';
import PPButtonInput from 'App/shared/atm.ButtonInput';
import styles from './styles.scss';

class ConnectionsControlBar extends React.Component {
    constructor(props) {
        super(props);
        this.setChannelFilter = this.setChannelFilter.bind(this);
        this.setChannelType = this.setChannelType.bind(this);
    }

    setChannelFilter(e) {
        this.props.setChannelFilter(e);
    }

    setChannelType(event, index, value) {
        this.props.setChannelType(value);
    }

    render() {

        let channelTypes = [<MenuItem value="" primaryText="All Types" key="" />];
        this.props.channels.forEach(channel => {
            channelTypes.push(<MenuItem value={channel} primaryText={channel} key={channel} />);
        });

        return (
            <div className={ ['row', styles.mainBlock].join(' ') }>
                <div
                    className={ ['col-xs-12', 'col-sm-12', 'col-md-12', styles.noLeftPadding].join(' ') }>
                        <PPButtonInput value={ this.props.channelFilter } type="text" hint="Search Channel" icon="search"
                                   onChange={ this.setChannelFilter }/>
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

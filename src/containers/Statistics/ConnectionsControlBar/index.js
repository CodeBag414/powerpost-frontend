import React from 'react';
import {connect} from 'react-redux';

import PPButton from 'elements/atm.Button';
import MenuItem from 'material-ui/MenuItem';
import PPSelectField from 'elements/atm.SelectField';
import PPInput from 'elements/atm.Input';
import PPButtonInput from 'elements/atm.ButtonInput';
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
                    className={ ['col-xs-12', 'col-sm-12', 'col-md-12', styles.searchchannel].join(' ') }>
                        <PPButtonInput value={ this.props.channelFilter } type="text" hint="Search Channel" icon="search"
                                   onChange={ this.setChannelFilter } style={{ 'margin-left': '2.8rem' }}/>
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

import React from 'react';
import {connect} from 'react-redux';

import FontIcon from 'elements/atm.FontIcon';
import PPButton from 'elements/atm.Button';
import IconButton from 'material-ui/IconButton';
import PPIconButton from 'elements/atm.IconButton';
import MenuItem from 'material-ui/MenuItem';
import PPSelectField from 'elements/atm.SelectField';
import PPInput from 'elements/atm.Input';
import PPButtonInput from 'elements/atm.ButtonInput';

class BrandsControlBar extends React.Component {
    constructor(props) {
        super(props);
        this.setBrandFilter = this.setBrandFilter.bind(this);
    }

    setBrandFilter(e) {
        this.props.setBrandFilter(e);
    }

    render() {
        const styles = require('./styles.scss');

        return (
            <div className={ ['row', styles.mainBlock].join(' ') }>
                <div className={ ['col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-2', styles.noLeftPadding, styles.verticalAlign].join(' ') }>
                    <PPButton label="ADD NEW BRAND" primary onClick={ this.props.handleDialogToggle } />
                    <PPIconButton style={{ top: '14px'}}>
                      <FontIcon>list</FontIcon>
                    </PPIconButton>
                    <PPIconButton style={{ top: '14px'}}>
                      <FontIcon>list</FontIcon>
                    </PPIconButton>
                </div>
                <div className={ ['col-xs-12', 'col-sm-6', 'col-md-6', 'col-lg-3', styles.noLeftPadding, styles.verticalAlign, styles.searchbox].join(' ') }>
                  <PPButtonInput value={ this.props.brandFilter } type="text" hint="Search" icon="search" onChange={ this.setBrandFilter }/>
                </div>
            </div>
        );
    }
}

BrandsControlBar.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(BrandsControlBar);

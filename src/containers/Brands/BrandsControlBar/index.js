import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import PPButton from 'elements/atm.Button';
import {Button, IconButton} from 'react-toolbox/lib/button';
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

        const BrandsControlBarContainer = styled.div`
            width: 100%;
            padding: 10px;
            display: inline-block;
            border: 1px solid #ddd;
            font-size: 18px;
            text-align: left;
            box-shadow: 2px 2px 9px rgba(0,0,0,0.1);

            div {
                display: inline-block;
                vertical-align: top;
            }
        `;

        return (
            <BrandsControlBarContainer>
                <div>
                    <PPButton label="ADD NEW BRAND" primary onClick={ this.props.handleDialogToggle } />
                    <IconButton icon='list' />
                    <IconButton icon='apps' accent />
                </div>
                <div>
                  <PPButtonInput value={ this.props.brandFilter } type="text" hint="Search" icon="search" onChange={ this.setBrandFilter }/>
                </div>
            </BrandsControlBarContainer>
        );
    }
}

BrandsControlBar.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(BrandsControlBar);

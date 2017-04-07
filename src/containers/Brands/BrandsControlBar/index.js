import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import PPButton from 'elements/atm.Button';
import {Button, IconButton} from 'react-toolbox/lib/button';
import PPButtonInput from 'elements/atm.ButtonInput';

const BrandsControlBarContainer = styled.div`
    width: 100%;
    padding: 10px;
    display: inline-block;
    border: 1px solid #ddd;
    font-size: 18px;
    text-align: left;
    box-shadow: 2px 2px 9px rgba(0,0,0,0.1);
`;

const BrandsControlButtons = styled.div`
    display: inline-block;
    vertical-align: top;
    margin: 5px 20px 10px 10px;
`;

const BrandsControlSearch = styled.div`
    display: inline-block;
    vertical-align: top;
    margin-top: 0px;

    div {
        margin-left: 10px  !important;
    }
`;

class BrandsControlBar extends React.Component {
    constructor(props) {
        super(props);
        this.setBrandFilter = this.setBrandFilter.bind(this);
    }

    setBrandFilter(e) {
        this.props.setBrandFilter(e);
    }

    render() {

        return (
            <BrandsControlBarContainer>
                <BrandsControlButtons>
                    <PPButton label="ADD NEW BRAND" primary onClick={ this.props.handleDialogToggle } />
                    <IconButton icon='list' />
                    <IconButton icon='apps' accent />
                </BrandsControlButtons>
                <BrandsControlSearch>
                  <PPButtonInput value={ this.props.brandFilter } type="text" hint="Search" icon="search" onChange={ this.setBrandFilter }/>
                </BrandsControlSearch>
            </BrandsControlBarContainer>
        );
    }
}

BrandsControlBar.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(BrandsControlBar);

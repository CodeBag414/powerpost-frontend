import React from 'react';
import styled from 'styled-components';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

class BrandsListItem extends React.Component {
    constructor(props) {
        super(props);
        this.brandDelete = this.brandDelete.bind(this);

        this.state = {
            accountpath: location.origin + '/account/' + this.props.brand.account_id
        }
    }

    getLastUpdatedTime (creation_time) {
        let d = new Date();
        let t = d.getTime() / 1000;
        let dif_minutes = Math.floor((t - creation_time) / 60);
        if ( dif_minutes < 60 )
            return dif_minutes + ' minutes';
        else {
            let dif_hours = Math.floor(dif_minutes / 60);
            if ( dif_hours < 24 )
                return dif_hours + ' hours';
            else
                return Math.floor(dif_hours / 24) + ' days';
        }
        return dif_minutes + ' minutes';
    }

    openPosts = (e) => {
        e.preventDefault();
        location.href = this.state.accountpath + '/posts';
    }

    openConnections = (e) => {
        e.preventDefault();
        location.href = this.state.accountpath + '/settings/connections';
    }

    openSettings = (e) => {
        e.preventDefault();
        location.href = this.state.accountpath + '/settings';
    }

    openTeam = (e) => {
        e.preventDefault();
        location.href = this.state.accountpath + '/settings/team';
    }

    brandDelete = (e) => {
        e.preventDefault();
        this.props.brandDelete(this.props.brand.brand_id);
    }

    render() {
        const styles = require('./styles.scss');

        const BrandItemContainer = styled.div`
            margin: 30px 0px 0px 20px;
            padding: 10px;
            display: inline-block;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 18px;
            text-align: left;
            box-shadow: 2px 2px 9px 3px rgba(0,0,0,0.1);

            &:hover {
                box-shadow: 2px 2px 9px 6px rgba(0,0,0,0.1);
            }

            div {
                display: inline-block;
                vertical-align: top;
            }
        `;

        const BrandImage = styled.div`
            width: 130px;
            height: 130px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
            }
        `;

        const BrandItemTitle = styled.div`
            width: 185px;
            height: 130px;
            margin-left: 20px;
            padding-top: 30px;
            border: 0px solid #ddd;
            line-height: 27px;

            span {
                font-size: 14px;
                color: #666;
            }
        `;

        const BrandNavMenu = () => (
            <IconMenu icon='more_horiz' position='topLeft' menuRipple>
                <MenuItem value='download' icon='send' caption='Posts' onClick={this.openPosts} />
                <MenuItem value='help' icon='swap_horiz' caption='Connections' onClick={this.openConnections} />
                <MenuItem value='settings' icon='group' caption='Team' onClick={this.openTeam} />
                <MenuItem value='settings' icon='settings' caption='Settings' onClick={this.openSettings} />
                <MenuDivider />
                <MenuItem value='signout' icon='delete' caption='Delete' disabled onClick={this.brandDelete} />
            </IconMenu>
        );

        return (
            <BrandItemContainer>
                <BrandImage>
                    <img src={this.props.brand.properties.thumb_url} />
                </BrandImage>
                <clearfix />
                <BrandItemTitle>
                    { this.props.brand.title }
                    <br/>
                    <span>
                        Last updated {this.getLastUpdatedTime(this.props.brand.creation_time)} ago
                    </span>
                </BrandItemTitle>
                <BrandNavMenu />
            </BrandItemContainer>
            
        );
    }
}

BrandsListItem.propTypes = {children: React.PropTypes.node};

export default BrandsListItem;

import React from 'react';
import FontIcon from 'elements/atm.FontIcon';

class BrandsListItem extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
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

    remove () {
        this.props.remove(this.props.brand.brand_id);
    }

    render() {
        const styles = require('./styles.scss');

        return (
            <div className={styles.brandBlock}>
                <div>
                    <div className={ styles.brandIcon }>
                        <i className={ this.props.brand.channel_icon }></i>
                    </div>
                    <div style={{ float: 'left' }}>
                        <div className={styles.brandName}>{ this.props.brand.title }</div>
                        <div>Last updated {this.getLastUpdatedTime(this.props.brand.creation_time)} ago</div>
                    </div>
                </div>
            </div>
        );
    }
}

BrandsListItem.propTypes = {children: React.PropTypes.node};

export default BrandsListItem;

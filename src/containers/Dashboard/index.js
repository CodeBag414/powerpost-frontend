/*
 * Dashboard
 *
 *
 */

import React from 'react';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PPButton from 'elements/atm.Button';
import Avatar from 'elements/atm.Avatar';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import {
  makeSelectUser,
  makeSelectUserAccount,
} from 'containers/App/selectors';

import BrandItem from './BrandItem';
import styles from './styles.scss';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log("this.props",this.props);
		const userInfo = this.props.user || null;
		const avatarUrl = (userInfo && userInfo.properties && userInfo.properties.thumb_url) ? userInfo.properties.thumb_url : null;

    return (
    	<div className="container">
    		<row>
    			<div className="col-md-12">
    				{
    					userInfo && userInfo.display_name
    					?	'Hello there ' + userInfo.display_name + ' !'
    					: ''
    				}
    			</div>
    		</row>

    		<row>
    			<div className="col-md-7">
    				<div className={['col-md-12', styles.userDashboardContain].join(' ')}>
	    				<row>
	    					<h3>My Brands</h3>
	    				</row>

	    				<hr />

	    				<row>
	    					<p>Easily jump into a brand to manage its posts.</p>
	    					<div>
	    						<BrandItem />
	    						<BrandItem />
	    						<BrandItem />
	    					</div>
	    				</row>
	    			</div>
    			</div>

    			<div className="col-md-5">
    				<div className={['col-md-12', styles.userDashboardContain].join(' ')}>
	    				<row>
	    					<h3>My User Settings</h3>
	    				</row>

	    				<hr />

	    				<row>
	    					<div>
	  							<p style={{display: 'inline-block'}}>Go here to manage all of your user info.</p>
	  							<PPButton theme={styles}>User Settings</PPButton>
  							</div>
	    				</row>

	    				<row>
                <img
                  src={avatarUrl}
                  className={styles.avatar}
                  alt="Profile Photo"
                />

                <div>
	                <div className={styles.avatar}>
	                	<p>Name</p>
	                	<span> {userInfo.display_name || ''} </span>
	                </div>

	                <div>
	                	<p>Email</p>
	                	<span> {userInfo.email || ''} </span>
	                </div>
                </div>

	    				</row>
    				</div>
    			</div>

    		</row>
    	</div>
    	);
  }
}


const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default UserCanAccount(connect(mapStateToProps)(Dashboard));

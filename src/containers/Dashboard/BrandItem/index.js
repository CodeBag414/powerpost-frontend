import React from 'react';

import styles from './styles.scss';

class BrandItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const inline = {
  		brand: {
  			display: 'inline-block',
  		},
  		socialButton: {
  			float: 'right',
  			color: '#6F6F6F',
  		},
  	}

  	return (
  		<div className="col-md-12">
  			<div style={inline.brand}>
	  			<img src="" alt="brand"/>
	  			<span>
	  				Role
	  			</span>
  			</div>

  			<div style={inline.socialButton}>
  				<i className="material-icons">send</i>
  				<i className="material-icons">repeat</i>
  				<i className="material-icons">group</i>
  				<i className="material-icons">settings</i>
  			</div>
  		</div>
  	);
  }
}

export default BrandItem;
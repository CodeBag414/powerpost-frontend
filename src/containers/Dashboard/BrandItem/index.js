import React from 'react';

import styles from './styles.scss';

class BrandItem extends React.Component {
  render() {
    const brand = this.props.brand;

    const thumbURL = (brand && brand.properties.thumb_url) ? brand.properties.thumb_url : '';
    const groupTitle = brand && brand.group_title ? brand.group_title : '';
    const title = brand && brand.title ? brand.title : '';

    return (
      <div className={styles.brandItem}>
        <div className={styles.brand}>
          <img src={thumbURL} alt="Brand" />
          <div className="role">
            <p><b>{title}</b></p>
            <p>{groupTitle}</p>
          </div>
        </div>

        <div className={styles.socialButton}>
          <i className="material-icons">send</i>
          <i className="material-icons">repeat</i>
          <i className="material-icons">group</i>
          <i className="material-icons">settings</i>
        </div>
      </div>
    );
  }
}

BrandItem.propTypes = {
  brand: React.PropTypes.object,
};

export default BrandItem;

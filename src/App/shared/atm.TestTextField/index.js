import React, { PropTypes } from 'react';

import styles from './styles.scss';

const TextField = (props) => {
  const errorStyles = props.errorText ? styles.errorBackground : '';

  return (
    <div className={styles.textFieldContainer}>
      <label className={styles.labelStyles} htmlFor={props.htmlFor}>{props.floatingLabelText}</label>
      <div className={styles.inputContainer} >
        <input className={props.iconClass ? styles.inputStylesWithIcon : `${styles.inputStyles} ${errorStyles}`} placeholder={props.hintText} onChange={props.onChange} />
        { props.iconClass && <i className={props.iconClass} /> }
      </div>
      <div className={styles.errorContainer}>
        { props.errorText }
      </div>
    </div>
  );
};

TextField.propTypes = {
  floatingLabelText: PropTypes.string,
  hintText: PropTypes.string,
  onChange: PropTypes.func,
  iconClass: PropTypes.string,
  errorText: PropTypes.string,
  htmlFor: PropTypes.any,
};

export default TextField;

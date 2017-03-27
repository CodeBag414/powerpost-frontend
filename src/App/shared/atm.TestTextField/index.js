import React, { PropTypes } from 'react';

const TextField = (props) => {
  const styles = require('./styles.scss');
  const errorStyles = props.errorText ? styles.errorBackground : '';

  return (
    <div className={styles.textFieldContainer} style={props.style}>
      <label className={styles.labelStyles}>{props.floatingLabelText}</label>
      <div className={styles.inputContainer}>
        <input className={props.iconClass ? styles.inputStylesWithIcon : styles.inputStyles + ' ' + errorStyles} type={props.type} name={props.name} value={props.value} placeholder={props.hintText} onChange={props.onChange} />
        {props.iconClass && <i className={props.iconClass} />}
      </div>
      <div className={styles.errorContainer}>
        {props.errorText}
      </div>
    </div>
  );
};

TextField.PropTypes = {
  floatingLabelText: React.PropTypes.string,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  style: React.PropTypes.object,
  hintText: React.PropTypes.string,
  onChange: React.PropTypes.func,
  iconClass: React.PropTypes.string,
  errorText: React.PropTypes.string,
};

export default TextField;

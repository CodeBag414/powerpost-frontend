import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
const MinorTabbar = ({
  onChange,
  tabs,
  currentTab,
}) => (
  <div className={styles['minor-tab-bar']}>
    {
      tabs.map((tab) =>
        <div
          className={`${styles['tab-item']} ${tab.value === currentTab ? styles.active : ''}`}
          style={tab.colSpan ? { flex: tab.colSpan } : {}}
          key={tab.value}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </div>
      )
    }
  </div>
);

MinorTabbar.propTypes = {
  onChange: PropTypes.func,
  tabs: PropTypes.array,
  currentTab: PropTypes.string,
};

export default MinorTabbar;

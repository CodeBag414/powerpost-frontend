import React from 'react';
import PropTypes from 'prop-types';

import FaButton from 'elements/atm.FaButton';

const faIcons = {
  Ready: {
    icon: 'fa-thumbs-o-up',
    bgColor: 'rgba(171,230,106,0.5)',
    fontColor: '#65883E',
  },
  Review: {
    icon: 'fa-check-square-o',
    bgColor: 'rgba(177,113,181,0.5)',
    fontColor: '#965B9A',
  },
  Draft: {
    icon: 'fa-pencil',
    bgColor: 'rgba(103,197,230,0.5)',
    fontColor: '#428096',
  },
  Idea: {
    icon: 'fa-lightbulb-o',
    bgColor: '#EFEFEF',
    fontColor: '#616669',
  },
};

const StatusSelector = ({
  activeStatus,
  onChange,
  statuses,
  permissionClasses,
}) => (
  <div className="status-selector">
    {
      statuses.map((status) =>
        <FaButton
          faIcon={faIcons[status.name].icon}
          label={status.name}
          bgColor={faIcons[status.name].bgColor}
          fontColor={faIcons[status.name].fontColor}
          active={parseInt(activeStatus, 10) === status.status}
          onClick={() => onChange(status.status)}
          className={permissionClasses[status.name]}
        />
      )
    }
  </div>
);

StatusSelector.propTypes = {
  activeStatus: PropTypes.bool,
  onChange: PropTypes.func,
  statuses: PropTypes.array,
  permissionClasses: PropTypes.object,
};

export default StatusSelector;

import React from 'react';
import PropTypes from 'prop-types';

import FaButton from 'elements/atm.FaButton';

const faIcons = {
  Ready: 'fa-thumbs-o-up',
  Review: 'fa-check-square-o',
  Draft: 'fa-pencil',
  Idea: 'fa-lightbulb-o',
};

const StatusSelector = ({
  activeStatus,
  onChange,
  statuses,
}) => (
  <div className="status-selector">
    {
      statuses.map((status) =>
        <FaButton
          faIcon={faIcons[status.name]}
          label={status.name}
          active={parseInt(activeStatus, 10) === status.status}
          onClick={() => onChange(status.status)}
        />
      )
    }
  </div>
);

StatusSelector.propTypes = {
  activeStatus: PropTypes.bool,
  onChange: PropTypes.func,
  statuses: PropTypes.array,
};

export default StatusSelector;

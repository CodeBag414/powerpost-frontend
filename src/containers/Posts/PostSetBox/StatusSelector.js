import React from 'react';
import PropTypes from 'prop-types';

const statuses = [
  { status: 3, statusColor: '#ABE66A', name: 'Ready' },
  { status: 5, statusColor: '#B171B5', name: 'Review' },
  { status: 2, statusColor: '#67C5E6', name: 'Draft' },
  { status: 6, statusColor: '#ACB5B8', name: 'Idea' },
];

const StatusSelector = ({
  activeStatus,
  onChange,
}) => (
  <div className="status-selector">
    {
      statuses.map((status) =>
        <div
          key={status.status}
          className={`${parseInt(activeStatus, 10) === status.status ? 'active-status' : ''} status-item`}
          onClick={() => onChange(status.status)}
          style={{ backgroundColor: status.statusColor, border: `2px solid ${status.statusColor}` }}
        >
          {status.name}
        </div>
      )
    }
  </div>
);

StatusSelector.propTypes = {
  activeStatus: PropTypes.bool,
  onChange: PropTypes.func,
};

export default StatusSelector;

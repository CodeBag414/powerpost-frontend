import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

import Header from './Header';
import ItemWrapper from './ItemWrapper';

const Item = ({ status, count }) => {
  let iconName = '';
  let statusName = '';
  switch (status) {
    case 'ready':
      iconName = 'fa-thumbs-o-up';
      statusName = 'Ready';
      break;
    case 'review':
      iconName = 'fa-check-square-o';
      statusName = 'Review';
      break;
    case 'draft':
      iconName = 'fa-pencil';
      statusName = 'Draft';
      break;
    case 'idea':
      iconName = 'fa-lightbulb-o';
      statusName = 'Idea';
      break;
    default:
      iconName = '';
      break;
  }

  const icon = <i className={`fa ${iconName}`} />;

  return (<ItemWrapper>
    <div className="icon">{icon}<span>{statusName}</span></div>
    <div className="text">{count || '0'}</div>
  </ItemWrapper>);
};

Item.propTypes = {
  status: PropTypes.string,
  count: PropTypes.number,
};

function StatusBoard({ data, path }) {
  return (
    <Card
      title="Status Board"
      description="Snapshot view of all post by status."
      link={path}
    >
      <Header>
        <p>Status</p>
        <p>Number of Posts</p>
      </Header>
      <Item status="ready" count={data.readyPostSets} />
      <Item status="review" count={data.inReviewPostSets} />
      <Item status="draft" count={data.draftPostSets} />
      <Item status="idea" count={data.ideaPostSets} />
    </Card>
  );
}

StatusBoard.propTypes = {
  data: PropTypes.shape(),
  path: PropTypes.string,
};

export default StatusBoard;

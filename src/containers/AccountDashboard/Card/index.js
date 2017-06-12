import React from 'react';
import PropTypes from 'prop-types';

import withReactRouter from 'elements/hoc.withReactRouter';

import Wrapper from './Wrapper';
import Capsule from './capsule';

const ReactRouterCapsule = withReactRouter(Capsule);

function Card({ title, description, path, children }) {
  return (
    <Wrapper>
      <h4>{title}</h4>
      <ReactRouterCapsule to={path}>
        <p>{description}</p>
        <i className="fa fa-chevron-right" />
      </ReactRouterCapsule>
      {children}
    </Wrapper>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.node,
};

export default Card;

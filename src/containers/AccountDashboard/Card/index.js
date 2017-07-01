import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Wrapper from './Wrapper';
import Header from './Header';
import Footer from './Footer';

function Card({ title, description, children, link }) {
  return (
    <Wrapper>
      <Header>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </Header>
      {children}
      <Footer>
        <Link to={link}>
          <span>View All</span><i className="fa fa-chevron-right" />
        </Link>
      </Footer>
    </Wrapper>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  link: PropTypes.string,
};

export default Card;

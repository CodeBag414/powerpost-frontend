import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TabLink from 'elements/atm.TabLink';

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #E7ECEE;
`;

const TabBar = ({ tabs }) => (
  <Wrapper>
    {
      tabs.map((t, index) => (
        <TabLink key={index} to={t.link}>
          { t.label }
        </TabLink>
      ))
    }
  </Wrapper>
);

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.objectOf({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TabBar;

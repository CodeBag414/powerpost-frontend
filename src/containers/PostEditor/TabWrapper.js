import styled from 'styled-components';

const TabWrapper = styled.div`
  position: relative;
  max-width: 450px;
  .tabs-bottom-border {
    background: #DBDFE0;
    bottom: 0;
    height: 1px;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
`;

export default TabWrapper;

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .main {
    width: 600px;
    padding: 25px 29px;
  }
  .side {
    width: 300px;
    border-left: 1px solid #DBDFE0;
  }
`;

export default Wrapper;

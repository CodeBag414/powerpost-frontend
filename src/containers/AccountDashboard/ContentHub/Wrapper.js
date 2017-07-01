import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #E7ECEE;
  padding: 20px 0;
  justify-content: space-between;
  .item {
    width: 30%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #E7ECEE;
    margin-bottom: 10px;
    img {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }
  }
`;

export default Wrapper;

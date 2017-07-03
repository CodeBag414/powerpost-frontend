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
  .error {
    color: #6F6F6F;
    font-size: 12px;
    font-weight: 500;
    margin-top: 10px;
    font-style: italic;
    margin: 0;
    padding: 0;
    padding-left: 10px;
  }
`;

export default Wrapper;

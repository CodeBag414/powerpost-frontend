import styled from 'styled-components';

const Capsule = styled.div`
  display: flex;
  align-items: center;
  font-family: Lato;
  font-size: 11px;
  padding: 15px 0 30px 0;
  justify-content: space-between;
  cursor: pointer;

  p {
    color: #6F6F6F;
    margin: 0;
    padding: 0;
    font-weight: 500;
    line-height: 13px;
  }

  i {
    color: #424647;
    font-weight: 500;
  }
`;

export default Capsule;

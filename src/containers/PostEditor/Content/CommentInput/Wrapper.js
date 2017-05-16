import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .input {
    flex: 1;
    margin-left: -4px;
    input {
      height: 40px;
      margin-top: -2px;
    }
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    position: relative;
    z-index: 100;
  }
`;

export default Wrapper;

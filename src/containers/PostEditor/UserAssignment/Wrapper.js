import styled from 'styled-components';

export default styled.div`
  position: relative;

  .assignee-wrapper {
    display: flex;
  }
  .right-box {
    display: inline-block;
    margin-left: 15px;
    .assigned-to {
      font-size: 1.3rem;
    }
    .name {
      font-size: 1.8rem;
    }
  }
  .fa-user {
    font-size: 4.5rem;
  }
`;

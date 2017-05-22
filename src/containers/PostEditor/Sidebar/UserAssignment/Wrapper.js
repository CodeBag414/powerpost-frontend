import styled from 'styled-components';

export default styled.div`
  position: relative;
  padding: 35px 0 24px 24px;

  .assignee-wrapper {
    display: flex;
    cursor: pointer;
  }
  .right-box {
    display: inline-block;
    margin-left: 14px;
    color: #888888;
    .assigned-to {
      font-size: 1.2rem;
      line-height: 1.5rem;
    }
    .name {
      margin-top: 2px;
      font-size: 1.6rem;
      line-height: 1.9rem;
    }
  }
  .fa-user {
    font-size: 4rem;
  }
`;

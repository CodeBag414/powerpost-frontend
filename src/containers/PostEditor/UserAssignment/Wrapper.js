import styled from 'styled-components';

export default styled.div`
  margin-top: 23px;
  position: relative;

  .assignee-wrapper {
    display: flex;
    cursor: pointer;
  }
  .right-box {
    display: inline-block;
    margin-left: 14px;
    color: #8C9496;
    .assigned-to {
      font-size: 12px;
      font-weight: bold;
      line-height: 15px;
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

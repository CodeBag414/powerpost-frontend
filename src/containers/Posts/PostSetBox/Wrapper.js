import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  .posts-heading {
    border-bottom: 1px solid #DBDFE0;
    height: 60px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-input {
      position: relative;
      input {
        height: 34px;
        width: 248px;
        border: 1px solid #C8CED0;
        border-radius: 4px;
        padding: 0 15px 0 40px;
        line-height: 34px;
        outline: none;
        transition: border-color 0.5s;
        font-size: 12px;
        &:focus {
          border-color: #E81C64;
        }
      }
      i {
        position: absolute;
        left: 15px;
        width: 20px;
        height: 16px;
        top: 9px;
        color: #ACB5B8;
      }
    }

    .status-selector {
      font-size: 14px;
      display: flex;
      .status-item {
        cursor: pointer;
        text-align: center;
        padding: 3px 0;
        margin: 4px;
        width: 80px;
        border-radius: 3px;
        color: white;
        transition: color 0.5s, background-color 0.5s;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        &:not(.active-status) {
          background-color: white !important;
          color: black;
        }
        .status-size {
          font-size: 10px;
          padding: 2px;
        }
      }
    }
  }

  .posts-content {
    display: flex;
    flex: 1;
    .post-list-container {
      width: 40%;
      max-width: 300px;
      height: 100%;
      float: left;
      display: flex;
      flex-direction: column;
    }
    .post-editor-container {
      flex: 1;
      position: relative;
    }
  }
`;

export default Wrapper;

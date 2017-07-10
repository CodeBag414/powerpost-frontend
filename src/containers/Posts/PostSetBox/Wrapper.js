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
    position: relative;
    z-index: 100000;
    border-bottom: 1px solid #DBDFE0;
    height: 60px;
    padding-right: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .filter-wrapper {
      display: flex;
      .sort_input {
        margin-left: 20px;
        height: 34px;
        &>div>div:first-child {
          height: 34px;
          line-height: 34px;
          width: 170px;
          padding-top: 0;
          padding-bottom: 0;
          &>div>span {
            line-height: 30px;
            display: block;
          }
        }
      }
      .search-input {
        position: relative;
        margin-left: 20px;
        height: 34px;
        div {
          width: 190px;
          vertical-align: middle;
          display: inline-block;
          height: 100%;
          overflow: hidden;
          transition: width 0.5s;
          &.inactive {
            width: 0;
            transition: width 0.5s;
          }
        }
        input {
          width: 100%;
          height: 34px;
          border: 1px solid #C8CED0;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
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
          vertical-align: middle;
          padding: 0 10px;
          font-size: 15px;
          line-height: 32px;
          color: #ACB5B8;
          border: solid 1px #ACB5B8;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          cursor: pointer;
        }
      }
    }

    .status-selector {
      display: flex;
      height: 100%;
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

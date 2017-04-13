import styled from 'styled-components';

const Avatar = styled.div`
  h5 {
    margin: 5px 0 10px;
    color: #9d9d9d;
  }
  .avatar {
    display: table;
    position: relative;

    img {
      left: 0px;
      width: 180px;
      height: 180px;
      border-radius: 4px;
    }
    .avatar-txt {
      position: absolute;
      width: 180px;
      height: 180px;
      top: 0;
      left: 0;
      border-radius: 4px;
      border: 1px solid #C8CED0;
      opacity: 0;
      background-color: rgba(0,0,0, .5);
      transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
      text-align: center;

      i, p {
        padding: 10px;
        color: white;
        display: inline-block;
      }

      i {
        margin-top: 70px;
        vertical-align: text-bottom;
        font-size: 20px;
      }

      &:hover {
        opacity: 1;
        border: 1px solid #e81c64;
        cursor: pointer;
      }
    }
  }
`;

export default Avatar;


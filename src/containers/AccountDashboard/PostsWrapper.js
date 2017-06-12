import styled from 'styled-components';

const PostsWrapper = styled.div`
  display: flex;
  font-family: Lato;
  color: #616669;

  .group {
    margin-right: 70px;
    margin-bottom: 35px;
    .title {
      font-size: 14px;
      line-height: 17px;
    }
    .item {
      font-size: 12px;
      font-weight: bold;
      line-height: 15px;
      text-decoration: underline;
      margin-top: 15px;
      margin-left: 15px;
    }
  }
`;

export default PostsWrapper;


import styled from 'styled-components';

const Content = styled.div`
  margin: 15px 0;
  color: #1d2129;

  .gp-message {
    font-size: 14px;
    line-height: 20px;
    margin: 0 16px 16px;
    word-wrap: break-word;
    max-height: 180px;
    overflow: hidden;
    font-weight: normal;
  }

  .gp-link {
    .divider {
      border-top: 1px solid #ebebeb;
      margin: 0 16px;
    }

    a {
      position: relative;
      display: block;
      text-decoration: none;
    }
    .display-name {
      color: rgba(0,0,0,0.87);
      margin: 16px;
      font-size: 20px;
      line-height: 28px;
      font-weight: 300;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      max-height: 56px;
    }

    .domain {
      position: absolute;
      line-height: 12px;
      max-width: 90%;
      left: 0;
      bottom: 0;
      border-radius: 2px;
      padding: 6px;
      margin: 16px;
      color: white;
      background-color: rgba(0,0,0,0.54);
      font-size: 12px;
      font-weight: 500;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  img {
    width: 100%;
    height: auto;
  }
  video {
    width: 100%;
    height: auto;
  }
`;

export default Content;

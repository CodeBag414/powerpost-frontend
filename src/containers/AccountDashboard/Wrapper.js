import styled from 'styled-components';

export default styled.div`
  width: 100%;
  margin-top: 30px;
  margin-right: 30px;

  * {
    font-family: 'Lato', sans-serif;
  }

  .leftPane {
    width: 40%;
    display: inline-block;
    padding: 15px;

    .avatar-block {
      margin-bottom: 25px;
      .avatar {
        display: inline-block;
        margin-right: 20px;
      }
      .avatar-text {
        display: inline-block;
        vertical-align: top;
        h5 {
          display: inline-block;
          font-size: 16px;
          font-weight: 900;
          color: #616669;
          margin-right: 20px;
        }
        p {
          font-size: 12px;
          color: #888888;
          text-transform: capitalize;
        }
      }
    }

    h6 {
      color: #6F6F6F;
    }
  }

  .rightPane {
    width: 60%;
    display: inline-block;
    padding: 15px;
    vertical-align: top;

    h4 {
      color: #616669;
    }
    p {
      color: #6F6F6F;
    }
  }

  @media (max-width: 768px) {
    .leftPane, .rightPane {
      width: 100%;
    }
  }
`;

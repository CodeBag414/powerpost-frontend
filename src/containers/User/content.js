import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  border-bottom: ${props => props.last ? 'none' : '1px solid #C8CED0'};
  padding-bottom: 30px;
  margin-bottom: 30px;

  h3 {
    color: #8C9497;
  }

  div.head {
  	width: 200px;
  	padding-left: 10px;
  	display: inline-block;
  	vertical-align: top;

    h5, p {
      color: #8C9497;
    }
  }

  div.body {
  	width: calc(100% - 200px);
  	display: inline-block;

  	div.col {
  		padding: 0 10px;
  		width: 50%;
  		display: inline-block;

      @media (max-width: 768px) {
        width: 100%;
        display: block;
      }
  	}

    .radio-group {
      margin-top: 30px;
      .email-radio {
        padding: 0 10px;
        width: 150px;
        display: inline-block;
      }
      @media (max-width: 768px) {
        margin-top: 0px;
      }
    }
    .email-radio {
      width: 150px;
      display: inline-block;
    }

    @media (max-width: 768px) {
      width: 100%;
      display: block;
    }
  }

  div.foot {
  	padding: 0 10px;
  	width: 100%;
  	min-height: 40px;
    button {
      float: right;
      height: 30px;
      min-width: 80px;
      line-height: 30px;
    }
  }
`;

export default Content;

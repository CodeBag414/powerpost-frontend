import styled from 'styled-components';

const Wrapper = styled.div`
  position:fixed;
  top: 0;
  z-index: 10000;
  height: 60px;
  right: 0;
  transition: transform .3s ease-in-out, width .3s ease-in-out;
  box-shadow: 0 1px 5px 0 rgba(60,92,129,0.20);
  background-color: #fff;
  width: ${(props) => props.isNotFullWidth ? 'calc(100% - 60px)' : '100%'};

  .new-post-button {
    margin-top: 13px;
    margin-right: 10px;
    float: right;
    color: #ffffff;
    padding: 0 20px;
    .button-plus {
      font-size: 19px;
      margin-right: 6px;
      vertical-align: middle;
    }
    .button-title {
      font-size: 12px;
      vertical-align: middle;
    }
  }
`;

export default Wrapper;

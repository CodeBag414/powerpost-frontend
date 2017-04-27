import styled from 'styled-components';

const Capsule = styled.div`
  cursor: pointer;
  padding: 10px 20px 0 20px;
  margin: 10px 0;
  min-height: 96px;
  border-radius: 4px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 5px 0 rgba(60,92,129,0.22);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  span {
    display: inline-block;
    width: calc(100% - 75px);
    h5 {
      font-size: 16px;
      font-weight: 900;
      color: #616669;
    }
    p {
      font-size: 12px;
      color: #6F6F6F;
    }
  }

  &:before {
    content: "\\f1b2";
    font-family: FontAwesome;
    font-size: 24px;
    color: #616669;
    float: left;
    line-height: 70px;
    margin-right: 20px;
  }
  &:after {
    content: "\\f105";
    font-family: FontAwesome;
    font-size: 18px;
    color: #424647;
    float: right;
    line-height: 70px;
  }
  &:hover {
    background-color: #F9FAFA;
    box-shadow: 0 5px 5px 0 rgba(60,92,129,0.22);
  }
`;

export default Capsule;

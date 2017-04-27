import styled from 'styled-components';

const SimpleCapsule = styled.div`
  cursor: pointer;
  margin: 30px 0;
  h5 {
    font-weight: bold;
    color: #616669;
    transition: text-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    &:after {
      font-family: FontAwesome;
      content: "\\f105";
      margin-left: 15px;
      font-size: 16px;
      transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  p {
    font-size: 12px;
    color: #6F6F6F;
  }

  &:hover {
    h5 {
      text-shadow: 3px 3px 2px rgba(60,92,129,0.22);
      &:after {
        margin-left: 20px;        
      }
    }
  }
`;

export default SimpleCapsule;

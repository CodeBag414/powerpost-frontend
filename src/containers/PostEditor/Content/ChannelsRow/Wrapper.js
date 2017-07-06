import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  i {
    color: #C8CED0;
    cursor: pointer;
    border-radius: 2.36px;
    font-size: 25px;
    margin-left: 8px;

    &.fa-home {
      margin-left: 20px;
      &.enabled {
        color: #E82664;
      }
    }
  }
  .channel-heading {
    color: ${(props) => props.currentChannel > -1 ? '#424647' : '#8C9496'};
    font-family: Lato;
    font-size: 14.4px;
    font-weight: bold;
    line-height: 17px;
    margin-right: 8px;
  }
`;

export default Wrapper;

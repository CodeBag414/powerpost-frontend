import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: ${(props) => props.hidden ? 'block' : 'none'};
  margin-bottom: 60px;
`;

export default Wrapper;

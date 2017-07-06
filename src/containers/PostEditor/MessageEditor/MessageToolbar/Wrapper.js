import styled from 'styled-components';

import { CHANNELS } from 'containers/PostEditor/Content/constants';

const Wrapper = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 4px 4px 0 0;
  border-bottom: 0.85px solid ${(props) => props.currentChannel > -1 ? CHANNELS[props.currentChannel].color : '#DBDFE0'};
  background-color: #f4f6f7;
  display: flex;
  justify-content: space-between;
`;

export default Wrapper;

import styled from 'styled-components';

function pendingStyle({ pending }) {
  if (pending) {
    return `
      opacity: 0.7;
      pointer-events: none;
    `;
  }
  return null;
}

const Wrapper = styled.div`
  ${pendingStyle};
  padding: 20px 10px;
`;

export default Wrapper;

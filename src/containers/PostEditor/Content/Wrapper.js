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
  margin-top: 27px;
  max-width: 450px;
  width: 100%;
`;

export default Wrapper;

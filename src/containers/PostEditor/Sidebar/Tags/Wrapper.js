import styled from 'styled-components';

function expandedStyle({ expanded }) {
  if (expanded) {
    return `
      & > div:last-child,
      & > div:last-child > div {
        overflow: visible !important;
      }
    `;
  }
  return null;
}

export default styled.div`
  padding: 24px 24px 10px;
  ${expandedStyle}
  .description {
    margin-bottom: 6px;
    font-size: 11px;
    color: #616669;
    line-height: 15px;
  }
`;

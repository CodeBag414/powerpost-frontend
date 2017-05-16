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
  padding: 20px;
  ${expandedStyle}
  .description {
    font-size: 11px;
    color: #616669;
    line-height: 15px;
  }
  .auto-complete {
    padding: 0;
    margin-top: -7px;
    ul:first-child {
      display: none;
    }
    ul:last-child {
      border-radius: 4px;
      box-shadow: 0 1px 5px 0 rgba(60,92,129,0.2);
      list-style-type: none;
      padding: 12px 17px;
      li {
        color: #8C9496;
        font-size: 12px;
        line-height: 25px;
        background-color: #ffffff !important;
        padding: 0;
        &:hover {
          color: #424647;
        }
      }
    }
    & > div {
      span, &:after {
        display: none;
      }
      input {
        padding: 9px;
        font-size: 12px;
        color: #616669;
        border: 1px solid #C8CED0;
        border-radius: 4px;
      }
    }
  }
`;

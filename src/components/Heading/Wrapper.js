import styled from 'styled-components';

function borderStyle({ border }) {
  if (border) {
    return `
      border-bottom: 2px solid #DBDFE0;
    `;
  }
  return null;
}

function expandStyle({ expand }) {
  if (expand) {
    return `
      cursor: pointer;
      &:hover {
        .title {
          text-decoration: underline;
        }
      }
    `;
  }
  return null;
}


const Wrapper = styled.div`
  display: flex;
  color: #888888;
  padding-bottom: 14px;
  line-height: 13px;
  ${borderStyle}
  ${expandStyle}
  .title {
    font-size: 13px;
    line-height: 15px;
  }
  .icon {
    font-size: 16px;
    line-height: 16px;
    margin-right: 13px;
  }
  .expand-icon {
    margin-left: auto;
  }
`;

export default Wrapper;

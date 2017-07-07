import styled from 'styled-components';

const Sidebar = styled.div`
  width: 258px;
  border-left: 1px solid #DBDFE0;
  .button-flat {
    border: none;
    color: #8C9496 !important;
    float: right;
    font-size: 12px;
    height: 30px;
    line-height: 1;
    margin-top: 14px;
    margin-right: 10px;
    &:hover {
      background: inherit !important;
    }
  }
`;

export default Sidebar;

import styled from 'styled-components';

const Sidebar = styled.div`
  background: #fff;
  border-left: 1px solid #DBDFE0;
  position: absolute;
  right: ${(props) => props.expanded ? '0' : '-258px'};
  top: 0;
  transition: right .25s;
  width: 258px;
  min-height: 100%;

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

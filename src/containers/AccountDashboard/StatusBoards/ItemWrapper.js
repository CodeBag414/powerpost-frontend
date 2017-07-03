import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  alignItems: center;
  height: 60px;
  border-bottom: 0.85px solid #DBDFE0;
  padding: 0 7px;
  .icon {
    font-size: 20px;
    display: flex;
    i {
      width: 20px;
      text-align: center;
    }
    .fa-thumbs-o-up {
      color: #ABE66A;
    }
    .fa-check-squre {
      color: #B171B5;
    }
    .fa-pencil {
      color: #67C5E6;
    }
    .fa-lightbulb-o {
      color: #ACB5B8;
    }
    span {
      color: #616669;
      font-size: 13px;
      font-weight: 500;
      padding-left: 19px;
    }
  }
  .text {
    color: #6F6F6F;
    font-size: 20px;
    font-weight: 300;
  }
`;

export default ItemWrapper;

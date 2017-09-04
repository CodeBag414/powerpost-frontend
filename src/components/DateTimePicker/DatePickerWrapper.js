import styled from 'styled-components';

const DatePickerWrapper = styled.input`
  outline: none;
  &::-webkit-clear-button {
    display: none;
  }
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    &::hover {
      cursor: pointer;
    }
  }
`;

export default DatePickerWrapper;

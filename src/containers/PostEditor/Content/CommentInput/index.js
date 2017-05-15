import React from 'react';
import TextField from 'elements/atm.TextField';
import Wrapper from './Wrapper';

function CommentInput() {
  return (
    <Wrapper>
      <img
        className="avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7e0bPUuXlXYOzYWsEiTHaPh7A0bLSaMewqyyotziPb6icpUeG"
        alt=""
      />
      <div className="input">
        <TextField />
      </div>
    </Wrapper>
  );
}

export default CommentInput;

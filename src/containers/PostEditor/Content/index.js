import React from 'react';
import Comments from './Comments';
import Comment from './Comment';
import CommentInput from './CommentInput';
import Wrapper from './Wrapper';

const comments = [
  {
    id: 1,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7Ebla9_lEucRaCo8BKLE1eEsu0fmxyxDYtHmIVMEp0fX95Fs',
    name: 'Olivia Smith',
    time: '2 hrs ago',
    comment: 'I\'ll update the copy. @katiejansen can you replace the image with the close up shot of the two Rum Swizzles. Thanks!',
  },
  {
    id: 2,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK30k4bBK8fadg26VmfdOIbENRIWYaundUQiRGpKHbikRtrOaCuQ',
    name: 'Katie Green',
    time: '15 mins ago',
    comment: 'Sounds Good.',
  },
];

function Content() {
  return (
    <Wrapper>
      <Comments />
      <CommentInput />
      {
        comments.map((comment) =>
          <Comment key={comment.id} comment={comment} />
        )
      }
    </Wrapper>
  );
}

export default Content;

export function getHasWordPressPost(postSet) {
  postSet.getIn(['data', 'posts']).some((post) => {
    if (post.get('status') === '0') return false;
    if (post.get('connection_channel') === 'wordpress') return true;
    return false;
  });
}

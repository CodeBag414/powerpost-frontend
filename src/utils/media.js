export function getMediaTypeAndItem(newMediaItem, postSet) {
  const mediaItems = postSet.getIn(['data', 'media_items']).toJS();
  let mediaItem = {};
  let type;

  /* Set media type & mediaItem */
  if (newMediaItem.type) {
    mediaItem = newMediaItem;
    type = newMediaItem.type;
  } else if (mediaItems && mediaItems.length) {
    mediaItem = mediaItems[0];
    type = mediaItems[0].type;
  } else {
    type = 'status';
  }

  return { type, mediaItem };
}

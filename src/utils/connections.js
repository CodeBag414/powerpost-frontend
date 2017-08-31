export function getConnectionForPost(connections, post) {
  return connections && connections.filter((item) =>
    item.connection_id === post.connection_id,
  )[0];
}

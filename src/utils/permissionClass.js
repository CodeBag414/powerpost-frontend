import _ from 'lodash';
const permissionDetails = {
  postEditor: {
    title: ['post_edit', 'disabled'],
    contentTab: ['post_edit', 'hidden'],
    assignedTo: ['post_review', 'hidden'],
    statusChangerAll: ['post_edit', 'hidden'],
    statusChangerReviewReady: ['post_review', 'hidden'],
    message: ['post_edit', 'disabled'],
    addContentControl: ['post_edit', 'hidden'],
    socialChannelsCustomMessage: ['post_edit', 'disabled'],
    // socialChannelsPreview: [null, '*'],
    commentsControl: ['post_comment', 'hidden'],
    commentsDelete: ['post_comment_delete', 'hidden'],
    contentScheduleTabs: ['post_edit', 'disabled'],
    postScheduleButton: ['post_edit', 'hidden'],
    timeSlots: ['post_edit', 'disabled'],
    timeSlotMessage: ['post_edit', 'hidden'],
    // timeSlotPreview: [null, null, null, '*'],
    timeSlotSchedule: ['post_edit', 'hidden'],
    timeSlotDelete: ['post_edit', 'hidden'],
    tags: ['post_edit', 'hidden'],
    // channels: [null, null, null, '*'],
    wordpressSettings: ['post_edit', 'hidden'],
    sharedStream: ['post_edit', 'disabled'],
    deletePostButton: ['post_delete', 'hidden'],
    Idea: ['post_edit', 'hidden'],
    Draft: ['post_edit', 'hidden'],
    Ready: [['post_edit', 'post_review'], 'hidden'],
    Review: [['post_edit', 'post_review'], 'hidden'],
    deleteEllipsesMenu: ['post_edit', 'hidden'],
    modifyDateTime: ['post_edit', 'hidden'],
  },
  mainNav: {
    createPost: ['post_edit', 'hidden'],
    // accountDashboard: ['*'],
    brands: ['brands', 'hidden'],
    contentHub: ['content_library', 'hidden'],
    statusBoards: ['board', 'hidden'],
    calendar: ['calendar', 'hidden'],
    posts: ['posts', 'hidden'],
    sharedStreams: ['shared_streams', 'hidden'],
    socialFeeds: ['social_feeds', 'hidden'],
    analytics: ['statistics', 'hidden'],
    connections: ['connections', 'hidden'],
    team: ['team', 'hidden'],
    settings: ['settings', 'hidden'],
  },
  library: {
    addToPost: ['post_edit', 'hidden'],
    createNewItem: ['content_edit', 'hidden'],
    editItem: ['content_edit', 'hidden'],
    deleteItem: ['content_edit', 'hidden'],
  },
  brands: {
    addNewBrandButton: ['brand_edit', 'hidden'],
    brandItemDelete: ['brand_edit', 'hidden'],
  },
  statusBoards: {
    deleteEllipsesMenu: ['post_delete', 'hidden'],
    Idea: ['post_edit', 'hidden'],
    Draft: ['post_edit', 'hidden'],
    Ready: [['post_edit', 'post_review'], 'hidden'],
    Review: [['post_edit', 'post_review'], 'hidden'],
  },
  calendar: {
    deleteButton: ['post_delete', 'hidden'],
    editButton: ['post_edit', 'hidden'],
    Idea: ['post_edit', 'hidden'],
    Draft: ['post_edit', 'hidden'],
    Ready: [['post_edit', 'post_review'], 'hidden'],
    Review: [['post_edit', 'post_review'], 'hidden'],
  },
  team: {
    inviteNewMember: ['team_edit', 'hidden'],
    deleteMember: ['team_edit', 'hidden'],
    roleDropdown: ['team_edit', 'disabled'],
  },
  sharedStreams: {
    removeFromStream: ['post_edit', 'hidden'],
    addPost: ['post_edit', 'hidden'],
  },
  posts: {
    Idea: ['post_edit', 'hidden'],
    Draft: ['post_edit', 'hidden'],
    Ready: [['post_edit', 'post_review'], 'hidden'],
    Review: [['post_edit', 'post_review'], 'hidden'],
  },
};

export const getClassesByPermission = (permissions = {}, field) => {
  const permissionsNormalized = (typeof permissions === 'object') ?
  Object.keys(permissions).map((key) => permissions[key]) : permissions;

  const permissionList = _.get(permissionDetails, field, []);
  const [permission, className] = permissionList;
  if (permission instanceof Array) {
    return permission.filter((permissionItem) => permissionsNormalized.indexOf(permissionItem) !== -1).length ? '' : className;
  }
  return permissionsNormalized.indexOf(permission) === -1 ? className : '';
};

export const getClassesByPage = (permissions = {}, page) => {
  const pagePermissions = permissionDetails[page];
  const classes = {};
  Object.keys(pagePermissions).forEach((key) => {
    const field = `${page}.${key}`;
    classes[key] = getClassesByPermission(permissions, field);
  });
  return classes;
};

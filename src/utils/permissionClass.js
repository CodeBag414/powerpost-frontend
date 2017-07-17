import _ from 'lodash';
const permissionDetails = {
  postEditor: {
    title: ['post_edit', 'disabled'],
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
    timeSlotMessage: ['post_edit', 'disabled'],
    // timeSlotPreview: [null, null, null, '*'],
    timeSlotSchedule: ['post_edit', 'hidden'],
    timeSlotDelete: ['post_edit', 'hidden'],
    tags: ['post_edit', 'hidden'],
    // channels: [null, null, null, '*'],
    wordpressSettings: ['post_edit', 'hidden'],
    sharedStream: ['post_edit', 'disabled'],
    deletePostButton: ['post_delete', 'hidden'],
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
  brands: {
    addNewBrandButton: ['brand_edit', 'hidden'],
    brandItemDelete: ['brand_edit', 'hidden'],
  },
  statusBoards: {
    deleteEllipsesMenu: ['post_delete', 'hidden'],
  },
  calendar: {
    deleteButton: ['post_delete', 'hidden'],
    editButton: ['post_edit', 'hidden'],
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
};

export const getClassesByPermission = (permissions = {}, field) => {
  const permissionsNormalized = (typeof permissions === 'object') ?
  Object.keys(permissions).map((key) => permissions[key]) : permissions;

  const permissionList = _.get(permissionDetails, field, []);
  const [permission, className] = permissionList;
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

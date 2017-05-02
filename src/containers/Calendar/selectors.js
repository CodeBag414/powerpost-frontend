/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';

const selectCalendar = state => state.get('posts');

const makeSelectPosts = () => createSelector(
    selectCalendar,
    posts => posts.get('posts'),
);

export {
    makeSelectPosts,
};

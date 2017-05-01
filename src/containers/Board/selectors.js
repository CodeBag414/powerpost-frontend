import { createSelector } from 'reselect';

const selectBoard = state => state.get('board');

const makeSelectPostSets = () => createSelector(
  selectBoard,
  board => board.get('postSets'),
);

export {
  makeSelectPostSets,
};

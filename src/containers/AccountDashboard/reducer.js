import {
  FETCH_STATUS_COUNT_REQUEST,
  FETCH_STATUS_COUNT_SUCCESS,
  FETCH_STATUS_COUNT_FAILURE,
} from './constants';

const initialState = {
  statusCount: {},
  requesting: null,
  error: null,
};

function accountDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STATUS_COUNT_REQUEST:
      return {
        ...state,
        statusCount: action.payload,
        requesting: true,
      };
    case FETCH_STATUS_COUNT_SUCCESS:
      return {
        ...state,
        statusCount: action.payload,
        requesting: false,
      };
    case FETCH_STATUS_COUNT_FAILURE:
      return {
        ...state,
        statusCount: action.payload,
        requesting: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default accountDashboardReducer;

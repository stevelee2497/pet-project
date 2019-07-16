import { FETCH_BOOKS_SUCCESS } from '../actions/actionTypes';
import { BOOK_TYPE } from '../AppConstants';

const initialState = {
  featuringBooks: [],
  newBooks: [],
  trendingBooks: [],
  recommendingBooks: []
};

const updateState = (state, payload) => {
  switch (payload.type) {
    case BOOK_TYPE.FEATURING_BOOKS:
      return { ...state, featuringBooks: payload.books };
    case BOOK_TYPE.NEW_BOOKS:
      return { ...state, newBooks: payload.books };
    case BOOK_TYPE.TRENDING_BOOKS:
      return { ...state, trendingBooks: payload.books };
    case BOOK_TYPE.RECOMMENDING_BOOKS:
      return { ...state, recommendingBooks: payload.books };
    default:
      return state;
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BOOKS_SUCCESS:
      return updateState(state, payload);
    default:
      return state;
  }
};

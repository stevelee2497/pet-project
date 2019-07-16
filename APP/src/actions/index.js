import { FETCH_BOOKS, FETCH_BOOKS_SUCCESS } from './actionTypes';

export const fetchBooks = (type, page, limit) => ({
  type: FETCH_BOOKS,
  payload: { type, page, limit }
});

export const fetchBooksSuccess = (books, type) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books, type }
});

export const login = payload => ({
  type,
  payload
});

import {
  FETCH_BOOKS, FETCH_BOOKS_SUCCESS, FETCH_BOOK, FETCH_BOOK_SUCCESS
} from './actionTypes';

export const fetchBooks = (type, page, limit) => ({
  type: FETCH_BOOKS,
  payload: { type, page, limit }
});

export const fetchBooksSuccess = (books, type) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books, type }
});

export const fetchBook = id => ({
  type: FETCH_BOOK,
  payload: { id }
});

export const fetchBookSuccess = book => ({
  type: FETCH_BOOK_SUCCESS,
  payload: book
});

export const login = payload => ({
  type,
  payload
});

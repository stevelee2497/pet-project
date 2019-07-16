import { put, takeEvery } from 'redux-saga/effects';
import faker from 'faker';
import { BOOK_TYPE } from '../AppConstants';
import { fetchBooksSuccess } from '../actions';
import { FETCH_BOOKS } from '../actions/actionTypes';
import { randomImage } from '../helpers/imageHelper';

function* fetchBooks({ payload }) {
  const { type, page, limit } = payload;
  switch (type) {
    case BOOK_TYPE.FEATURING_BOOKS:
      break;
    default:
  }

  const books = Array.from({ length: limit }).map(_ => ({
    id: faker.random.uuid(),
    image: randomImage(200, 300),
    cover: randomImage(1000, 600),
    title: faker.random.words(2)
  }));

  console.log(books);

  yield put(fetchBooksSuccess(books, type));
}

export function* watchFetchBooks() {
  yield takeEvery(FETCH_BOOKS, fetchBooks);
}

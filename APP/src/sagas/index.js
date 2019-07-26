import { all } from 'redux-saga/effects';
import { watchFetchBooks, watchFetchBook } from './bookSagas';

export default function* sagas() {
  yield all([watchFetchBooks(), watchFetchBook()]);
}

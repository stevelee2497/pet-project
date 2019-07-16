import { all } from 'redux-saga/effects';
import { watchFetchBooks } from './bookSagas';

export default function* sagas() {
  yield all([watchFetchBooks()]);
}

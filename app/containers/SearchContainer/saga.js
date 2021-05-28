import { put, call, takeLatest } from 'redux-saga/effects';
import { getSearchResults } from '@services/itunesApi';
import { Types } from './reducer'

export function* getSearchResult(action) {
    const response = yield call(getSearchResults, action.payload);
    const { data, ok } = response;
    if (ok) {
        yield put({
            type: Types.SUCCESS_SEARCH,
            payload: {
                data
            }
        }, );
    }
    // else {
    //     yield put(failureSearchResults(data));
    // }
}

export default function* searchContainerSaga() {
    yield takeLatest(Types.REQUEST_SEARCH, getSearchResult);
}
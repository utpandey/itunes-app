/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSearchResults } from '@services/itunesApi';
import { api } from '@utils/ituneApiUtils';
import searchContainerSaga, { getSearchResult } from '../saga';
import { Types, requestSearch, successSearch, clearSearch } from '../reducer';

describe('SerchContainer saga tests', () => {
    const generator = searchContainerSaga();
    const searchText = 'Katy';
    let getSearchResultGenerator = getSearchResult({ searchText });

    it('should start task to watch for REQUEST_GET_GITHUB_REPOS action', () => {
        expect(generator.next().value).toEqual(takeLatest(Types.REQUEST_SEARCH, getSearchResult));
    });
    // it('should ensure that the action SUCCESS_GET_GITHUB_REPOS is dispatched when the api call succeeds', () => {
    //     getSearchResultGenerator = getSearchResult({ searchText });
    //     const res = getSearchResultGenerator.next().value;
    //     console.log(res)
    //     expect(res).toEqual(call(getSearchResults, searchText));
    //     const apiResponse = {
    //         totalCount: 50,
    //         items: [{ searchObject: searchText }]
    //     };
    //     expect(getSearchResultGenerator.value).toEqual(
    //         put({
    //             type: Types.SUCCESS_SEARCH,
    //             data: apiResponse
    //         })
    //     );
    // });
});
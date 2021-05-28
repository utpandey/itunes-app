import { searchContainerReducer, INITIAL_STATE, requestSearch, successSearch, Types, clearSearch } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('searchContainerReducer reducer tests', () => {
    let state;
    beforeEach(() => {
        state = INITIAL_STATE;
    });

    it('should return the initial state', () => {
        expect(searchContainerReducer(undefined, {})).toEqual(state);
    });

    it('should return the initial state when an action of type REQUEST_SEARCH is dispatched', () => {
        const payload = 'Katy Perry';
        const expectedResult = {...state, searchText: payload };
        expect(
            requestSearch(state, {
                type: Types.REQUEST_SEARCH,
                payload
            })
        ).toEqual(expectedResult);
    });

    it('should ensure that the search result array is present and check SUCCESS_SEARCH', () => {
        const payload = { artist: 'Katy Perry' };
        const expectedResult = {...state, searchResult: payload };
        expect(
            successSearch(state, {
                type: Types.SUCCESS_SEARCH,
                payload
            })
        ).toEqual(expectedResult);
    });

    it('should ensure that CLEAR_SEARCH results in empty search result object', () => {
        const expectedResult = {...state, searchResult: null };
        expect(
            clearSearch(state, {
                type: Types.CLEAR_SEARCH
            })
        ).toEqual(expectedResult);
    });

});
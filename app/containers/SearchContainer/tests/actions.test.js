import ActionCreators, { Types } from '../reducer';

describe('searchContainer action tests', () => {
    it('has a type of REQUEST_SEARCH_RESULTS', () => {
        const expected = {
            type: Types.REQUEST_SEARCH,
            payload: 'payload'
        };
        expect(ActionCreators.requestSearch('payload')).toEqual(expected);
    });
    it('has a type of SUCCESS_SEARCH_RESULTS', () => {
        const expected = {
            type: Types.SUCCESS_SEARCH,
            payload: 'payload'
        };
        expect(ActionCreators.successSearch('payload')).toEqual(expected);
    });
    it('has a type of CLEAR_SEARCH', () => {
        const expected = {
            type: Types.CLEAR_SEARCH
        };
        expect(ActionCreators.clearSearch()).toEqual(expected);
    });
});
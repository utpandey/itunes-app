/*
 *
 * SearchContainer reducer
 *
 */
import { createActions, createReducer } from 'reduxsauce';


export const { Types, Creators } = createActions({
    requestSearch: ['payload'],
    successSearch: ['payload'],
    clearSearch: null
})

export default Creators

export const INITIAL_STATE = { searchText: null, searchData: [], searchError: null, searchResult: [] };

export const requestSearch = (state, action) => {
    return {...state, searchText: action.payload }
}

export const successSearch = (state, action) => {
    console.log(action.payload.data)
    return {...state, searchResult: action.payload }
}
export const clearSearch = (state) => {
    return {...state, searchResult: null }
}

export const HANDLERS = {
    [Types.REQUEST_SEARCH]: requestSearch,
    [Types.SUCCESS_SEARCH]: successSearch,
    [Types.CLEAR_SEARCH]: clearSearch
}
export const searchContainerReducer = createReducer(INITIAL_STATE, HANDLERS)
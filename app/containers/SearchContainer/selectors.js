import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the searchContainer state domain
 */

const selectSearchContainerDomain = state => state.searchContainer || initialState;
// console.log(selectSearchContainerDomain)
/**
 * Other specific selectors
 */

/**
 * Default selector used by searchContainer
 */

export const selectSearchContainer = () =>
    createSelector(
        selectSearchContainerDomain,
        substate => substate
    );

export const selectSearchText = () =>
    // console.log(state)
    createSelector(
        selectSearchContainerDomain,
        substate => get(substate, 'searchText', null)
    );

export const selectSearchResult = () =>
    createSelector(
        selectSearchContainerDomain,
        substate => get(substate, 'searchResult', null)
    );

export const selectSearchError = () =>
    createSelector(
        selectSearchContainerDomain,
        substate => get(substate, 'searchError', null)
    );

export default selectSearchContainer;
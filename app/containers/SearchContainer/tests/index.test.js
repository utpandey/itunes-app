/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { SearchContainerTest as SearchContainer } from '../index';

describe('<SearchContainer /> tests', () => {
            let submitSpy;

            beforeEach(() => {
                submitSpy = jest.fn();
            });
            it('should render and match the snapshot', () => {
                    const { baseElement } = renderProvider( < SearchContainer getSearchResult = { submitSpy }
                        />);
                        expect(baseElement).toMatchSnapshot();
                    });

                it('should call dispatchClearResults on empty change', async() => {
                    const getSearchResultSpy = jest.fn();
                    const clearResultsSpy = jest.fn();
                    const { getByTestId } = renderProvider( < SearchContainer clearResults = { clearResultsSpy }
                        getSearchResult = { getSearchResultSpy }
                        />
                    );
                    fireEvent.change(getByTestId('search-text'), {
                        target: { value: 'a' }
                    });
                    await timeout(500);
                    expect(getSearchResultSpy).toBeCalled();
                    fireEvent.change(getByTestId('search-text'), {
                        target: { value: '' }
                    });
                    await timeout(500);
                    expect(clearResultsSpy).toBeCalled();
                });

                // it('should call dispatchGithubRepos on change', async() => {
                //         const { getByTestId } = renderProvider( < SearchContainer dispatchGithubRepos = { submitSpy }
                //             />);
                //             fireEvent.change(getByTestId('search-text'), {
                //                 target: { value: 'some repo' }
                //             }); await timeout(500); expect(submitSpy).toBeCalled();
                //         });
            });
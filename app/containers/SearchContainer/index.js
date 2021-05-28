// react
import React, { useState, useEffect, memo } from 'react';
// antd
import { Input, Tag, Card, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// style
import 'antd/dist/antd.css';
import './styles.less';
import styled from 'styled-components';
// utils
import { useInjectSaga } from 'utils/injectSaga';
// store-redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import saga from './saga';
import ActionCreator from './reducer';
// lodash
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
// react-intl
import { injectIntl } from 'react-intl';
// import { useHistory } from 'react-router-dom';

const CardContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  text-align: center;
  white-space: pre-line;
  margin: 100px 0 10px 0;
  padding: 10px 20px 10px 20px;
  @media only screen and (max-width: 600px) {
    margin: 50px 0 10px 0;
    padding: 0;
  }
`;

const CardItem = styled.div`
  cursor: pointer;
  padding: 1em;
  border-radius: 1em;
  border: none;
  background-color: #c8d8e7;
  outline: none;
  transition: all 0.1s ease;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${'' /* box-shadow: 10px 5px 5px black; */}
  box-shadow: 5px 5px 10px rgb(50, 46, 46), -5px -5px 10px rgb(255,255,255);
  &:active {
    box-shadow: inset 5px 5px 10px rgb(50, 46, 46), inset -5px -5px 10px rgb(255, 255, 255);
  }
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 991px) {
    margin: 1rem 3rem 1rem 3rem;
  }
  @media only screen and (max-width: 600px) {
    margin: 1rem 0 1rem 0;
    padding: 1rem 0 0 0;
    width: 100%;
  }
`;

const CardContents = styled.div`
  background-color: #fff
  margin: 20px 0px 20px 20px;
  transition: all 0.1s ease;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  @media only screen and (max-width: 700px) {
    margin: 1rem 0 0rem 0;
    padding: 10px;
  }
`;

const CardImage = styled.img`
  height: 100%;
  border-radius: 10px;
  @media only screen and (max-width: 350px) {
    width: 90%;
  }
`;

const CardTitle = styled.h1`
  color: #000;
  font-size: 30px;
  @media only screen and (max-width: 845px) {
    font-size: 30px;
  }
`;

const CardBody = styled.p`
  color: #000;
  font-size: 20px;
  @media only screen and (max-width: 845px) {
    font-size: 20px;
  }
`;

export function SearchContainer({
  intl,
  search,
  dispatchSearchText,
  clearResults,
  searchData = [],
  searchError = null,
  searchText,
  getSearchResult
}) {
  useInjectSaga({ key: 'searchContainer', saga: saga });
  const [loading, setLoading] = useState(false);
  const [searchResults, setResults] = useState([]);

  useEffect(() => {
    const loaded = get(searchResults, 'items', null) || searchError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [searchData]);

  useEffect(() => {
    if (searchText && !searchData?.items?.length) {
      dispatchSearchText(searchText);
      setLoading(true);
    }
  }, []);

  const handleOnChange = searchInput => {
    if (!isEmpty(searchInput)) {
      getSearchResult(searchInput);
      setLoading(true);
    } else {
      clearResults();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  // const items = get(searchResults, 'items', []);
  // console.log(search?.data);

  return (
    <>
      <div className="layout" style={{ height: '100vh' }}>
        <Card
          title={intl.formatMessage({ id: 'search_header' })}
          bordered={false}
          style={{ width: 300 }}
          className="search-container"
          extra={<Tag color="blue">iTunes</Tag>}
        >
          <div className="search-container-card">
            <SearchOutlined className="search-box-icon" />
            <Input
              value={searchText}
              type="text"
              data-testid="search-text"
              onChange={e => debouncedHandleOnChange(e.target.value)}
              placeholder={intl.formatMessage({ id: 'artist_name' })}
              className="search-box"
            />
          </div>
        </Card>
        <CardContainer>
          {search ? (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 3
              }}
              dataSource={search.data.results}
              renderItem={item => (
                <CardItem>
                  <CardImage src={item.artworkUrl100.replace('100x100', '200x200')} />
                  <CardContents>
                    <CardTitle style={{ flex: 1 }}>{item.artistName}</CardTitle>

                    <CardBody>{item.collectionCensoredName}</CardBody>
                    <CardBody>{item.releaseDate.substring(0, 4)}</CardBody>
                    <CardBody onClick={() => window.open(item.previewUrl)} style={{ color: 'red', fontSize: '25px' }}>
                      {item.trackName}
                    </CardBody>
                  </CardContents>
                </CardItem>
              )}
            />
          ) : null}
        </CardContainer>
      </div>
    </>
  );
}

const searchSelector = state => state.searchContainer;

export const searchResultsSelector = createSelector(
  [searchSelector],
  searchContainer => {
    return searchContainer.searchResult;
  }
);

const mapStateToProps = state => {
  return {
    search: searchResultsSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  getSearchResult: searchText => dispatch(ActionCreator.requestSearch(searchText)),
  clearResults: () => dispatch(ActionCreator.clearSearch())
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(SearchContainer);

export const SearchContainerTest = compose(injectIntl)(SearchContainer);

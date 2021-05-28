import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { List, Typography } from 'antd';
import img1 from '../../images/img1.svg';
import img2 from '../../images/img2.svg';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

const Container = styled.div`
  overflow-y: auto;
  height: 100vh;
  width: 100%;
  display: flex;
  flexdirection: row;
  background-color: #e2e9f4;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
  align-items: center;
  align-self: center;
  justify-content: space-around;
`;

const RightContainer = styled.div`
  display: flex;
  flex: 0.5;
  flex-direction: column;
  align-text: center;
  align-items: center;
  padding: 2rem;
`;

const FirstImage = styled.img`
  margin: 1rem;
  width: 50%;
  margin-right: 30%;
  ${'' /* background-color: #000; */}
`;
const SecondImage = styled.img`
  margin-left: 50%;
  width: 50%;
  margin: 1rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
`;

const Body1 = styled.h2`
  font-size: 1.5rem;
`;

const data = [
  'iTunes API',
  'Unit tests',
  'reduxsauce',
  'redux-saga',
  'Styled-components',
  'ant.design',
  'react-intl',
  'react-router',
  'Reselect'
];

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  color: #ff317c;
  background-color: #433556;
`;

function LangingContainer({ intl }) {
  const history = useHistory();
  const handler = () => {
    history.push('/search');
  };
  return (
    <Container>
      <LeftContainer>
        <FirstImage src={img1} />
        <SecondImage src={img2} />
      </LeftContainer>
      <RightContainer>
        <HeaderTitle>{intl.formatMessage({ id: 'welcome_home' })}</HeaderTitle>

        <Body1>{intl.formatMessage({ id: 'made_below' })}</Body1>
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Typography.Text>&gt;</Typography.Text> {item}
            </List.Item>
          )}
        />
        <Button onClick={handler}>{intl.formatMessage({ id: 'search_btn' })}</Button>
      </RightContainer>
    </Container>
  );
}

export default compose(injectIntl)(LangingContainer);

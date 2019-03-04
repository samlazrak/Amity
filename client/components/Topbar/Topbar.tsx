import React from 'react';
import styled from 'styled-components';
import UserProfile from './UserPofile';
import { withRouter } from 'react-router-dom';
import { changePageTitle } from '../../utils/Page';
import TopbarMenu from './TopbarMenu';

const TopbarWrapper = styled.div`
  background: #fff;
  overflow: auto;
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: start;

  h1 {
    padding: 20px 0;
    margin: 0 0 0 30px;
    font-weight: 400;
    color: #3B3F4F;
    vertical-align: middle;
    justify-self: start;
    font-size: 20px;
    user-select: none;
    text-transform: capitalize;
  }

  h3 {
    font-weight: 400;
    color: #7983A4;
    font-size: 18px;
    padding: 33px 10px;
    margin: 0;
    display: none;
  }

  @media screen and (min-width: 55em) {
    width: 100%;
    height: 86px;
    margin-top: 0;

    h1 {
      font-size: 28px;
      padding: 26px 0;
      user-select: auto;
      float: left;
    }

    h3 {
      display: block;
    }
  }
`;

interface Props {
  title: string;
  secondaryTitle?: string;
};

const Topbar = (props: Props) => {
  let pageTitle = props.title;
  if (props.secondaryTitle) {
    pageTitle += ` - ${props.secondaryTitle}`;
  }
  changePageTitle(pageTitle);

  return (
    <TopbarWrapper>
      <h1>{props.title}</h1>
        {props.secondaryTitle &&
          <h3>{props.secondaryTitle}</h3>
        }
      <UserProfile />
    </TopbarWrapper>
  );
};

// @ts-ignore
export default withRouter(Topbar);

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const TopbarMenu = styled.div`
  min-width: 100%;
  background: #fff;
  overflow-x: scroll;
  margin-top: -2px;
  padding: 0 30px;
  white-space: nowrap;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: rgba(0, 0, 0, 0);
  }

  .menu {
    width: 100%;

    a {
      display: inline-block;
      padding-bottom: 15px;
      margin-right: 30px;
      color: #7983A4;
      text-decoration: none;
      border-bottom: 3px solid #fff;

      &.active {
        color: #3B3F4F;
        font-weight: 500;
        border-bottom-color: #3B3F4F;
      }
    }
  }
`;

interface TopBarLink {
  title: string;
  to: string;
  exact?: boolean;
};

interface Props {
  links: TopBarLink[];
};

export default (props: Props) => {
  return (
    <TopbarMenu>
      <div className="menu">
        {props.links.map((link: TopBarLink, index: number) => (
          <NavLink key={index} exact={!!link.exact} to={link.to}>{link.title}</NavLink>
        ))}
      </div>
    </TopbarMenu>
  );
};

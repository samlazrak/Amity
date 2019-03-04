import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const NavigationWrapper = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      font-size: 16px;
      user-select: none;

      a {
        padding: 14px 30px;
        display: block;
        color: #fff;
        text-decoration: none;

        svg {
          margin-right: 10px;
          font-size: 18px;
          vertical-align: middle;
          margin-top: -4px;
        }

        &:hover {
          opacity: 0.9;
        }

        &.active {
          background: #fff;
          color: #454855;
          padding-top: 14px;
          padding-bottom: 14px;

          -webkit-transition: background 0.4s ease-in;
          -moz-transition: background 0.4s ease-in;
          -o-transition: background 0.4s ease-in;
          -ms-transition: background 0.4s ease-in;
          transition: background 0.4s ease-in;

          &:hover {
            opacity: 1;
          }

          svg {
            color: #79B2AA;
          }
        }
      }
    }
  }
`;

interface Props {
  onClick: any;
  links: any;
};

const Navigation = (props: Props) => {
  return (
    <NavigationWrapper>
      <ul>
        {props.links.map((link: any) => (
          <li onClick={props.onClick} key={link.path}>
            <NavLink exact to={`${link.path}`}>
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </NavigationWrapper>
  );
};

// @ts-ignore
export default withRouter(Navigation);

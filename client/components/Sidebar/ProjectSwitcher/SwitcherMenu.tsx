import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { truncateText } from '../../../utils/Strings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SwitcherMenu = styled.div`
  position: fixed;
  z-index: 600;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow: scroll;

  .close-switcher {
    width: 100%;
    overflow: auto;
    font-size: 22px;
    cursor: pointer;

    p {
      margin: 0;
      padding: 20px;
      float: right;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 14px;

    li {
      a {
        color: #7983A4;
        display: block;
        padding: 14px 14px;
        border-bottom: 1px solid #f5f5f5;
        text-decoration: none;

        &:hover {
          background: #f5f5f5;
          cursor: pointer;
        }
      }

      &:first-child {
        a {
          padding-top: 15px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      }

      &:last-child {
        a {
          border-bottom: none;
          padding-bottom: 15px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }

  @media screen and (min-width: 55em) {
    position: absolute;
    left: 15px;
    top: 160px;
    width: 240px;
    height: auto;
    border-radius: 5px;
    overflow: hidden;

    .close-switcher {
      display: none;
    }
  }
`;

interface Project {
  id: string;
  name: string;
};

interface Props {
  projects: Project[];
  onClick: any;
  toggleMenu: any;
};

export default (props: Props) => (
  <SwitcherMenu className="shadow">
    <div onClick={props.toggleMenu} className="close-switcher">
      <p><FontAwesomeIcon icon={{ prefix: 'far', iconName: 'times'}} /></p>
    </div>
    <ul>
      {props.projects.map((project: Project, index: number) => (
        // @ts-ignore
        <li onClick={props.onClick}>
          <NavLink key={index} to={`/project/${project.id}`}>
            {project.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </SwitcherMenu>
);

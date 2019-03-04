import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SettingsMenu = styled.ul`
  list-style: none;
  margin: auto 0 0;
  padding: 12px 0;
  border-top: 1px solid #f5f5f5;

  li {
    font-size: 14px;
    user-select: none;

    a {
      display: block;
      padding: 8px 30px;
      color: #fff;
      text-decoration: none;

      svg {
        display: inline-block;
        margin-right: 6px;
      }
    }
  }
`;

export default () => {
  return (
    <SettingsMenu>
      <li>
        <Link to="/settings">
          <FontAwesomeIcon icon={{ prefix: "far", iconName: "cog" }} />
          Settings
        </Link>
      </li>
      <li>
        <Link to="/logout">
          <FontAwesomeIcon icon={{ prefix: "far", iconName: "sign-out" }} />
          Sign Out
        </Link>
      </li>
    </SettingsMenu>
  );
};

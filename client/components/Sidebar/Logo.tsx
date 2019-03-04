import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import logoImage from '../../img/logo-light.svg';

const Logo = styled.div`
  display: none;
  outline: none;

  @media screen and (min-width: 55em) {
    animation: fade-in-right ease 0.6s forwards;
    margin: 0 auto;
    width: 160px;
    padding: 36px 0 24px;
    display: block;
  }
`;

export default () => (
  <Logo>
    <NavLink to="/">
      <img src={logoImage} alt="Creature" />
    </NavLink>
  </Logo>
);

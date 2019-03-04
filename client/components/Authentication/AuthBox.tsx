import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import logo from '../../img/logo.svg';
import Copyright from './Copyright';

const AuthBox = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  opacity: 1;

  .logo {
    margin: 40px auto 0;
    width: 200px;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(0);
    }

    to {
      opacity: 1;
      transform: translateY(-20px);
    }
  }

  @media screen and (min-width: 40em) {
    margin-top: 20px;
    width: 390px;
    opacity: 0;
    height: auto;
    box-shadow: 0px 3px 10px rgba(0,0,0,0.05);
    animation: fade-up ease 0.5s forwards;
  }
`;

export default ({ children }: { children: any }) => {
  return (
    <AuthBox>
      <div className="logo">
        <img src={logo} />
      </div>
      {children}
      <Copyright />
    </AuthBox>
  );
};

import React from 'react';
import styled from 'styled-components';
import AuthBox from './AuthBox';
import VideoBackground from './VideoBackground';

const AuthRoot = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  text-align: center;
`;

const GradientOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background: linear-gradient(321deg, rgba(107,181,86,0.9) 0%, rgba(108,193,199,0.9) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ children }: { children: any }) => {
  return (
    <AuthRoot>
      <VideoBackground />
      <GradientOverlay>
        <AuthBox>
          {children}
        </AuthBox>
      </GradientOverlay>
    </AuthRoot>
  );
};

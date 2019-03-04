import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import loginVideo from '../../img/login.mp4';

const VideoWrapper = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;

  video {
    position: absolute;
    display: none;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    min-height: 50%;
    min-width: 50%;
  }

  @media screen and (min-width: 40em) {
    video {
      display: block;
    }
  }
`;

const VideoBackground = () => {
  return (
    <VideoWrapper>
      <video preload="none" src={loginVideo} muted loop autoPlay></video>
    </VideoWrapper>
  );
}

export default VideoBackground;

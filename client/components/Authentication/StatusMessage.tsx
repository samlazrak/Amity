import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StatusMessage = styled.div`
  padding: 10px 40px;
  text-align: center;
  p {
    color: #7983A4;
    line-height: 26px;
  }
`;

interface Props {
  message: string;
  link?: string;
  linkText?: string;
};

export default (props: Props) => {
  return (
    <StatusMessage>
      <p>{props.message}</p>
      {props.link && props.linkText &&
        <Link className="auth-link" to={props.link}>{props.linkText}</Link>
      }
    </StatusMessage>
  )
};

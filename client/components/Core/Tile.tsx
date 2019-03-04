import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TileWrapper = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;

  @media screen and (min-width: 55em) {
    margin-bottom: 24px;
  }

  h3 {
    font-weight: normal;
    font-size: 18px;
    margin: 5px 0 10px;
  }

  .title {
    font-size: 20px;
    font-weight: 400;
  }

  .link {
    margin: 20px auto 0;
    font-size: 12px;
    width: 100%;
    text-align: center;
    display: block;
    clear: both;
    color: #7983A4;
    font-size: 16px;
    text-decoration: none;
    transition: color .1s ease-in;
    padding-top: 15px;
    border-top: 1px solid #e7e7e7;

    &:hover {
      color: #636b88;
    }
  }
`;

interface Props {
  children: any;
  title?: string;
  link?: string;
  linkText?: string;
};

const Tile = (props: Props) => {
  return (
    <TileWrapper className="shadow">
      {props.title &&
        <h3 className="title text-black">{props.title}</h3>
      }
      {props.children}
      {props.link && props.linkText &&
        <Link className="link" to={props.link}>{props.linkText}</Link>
      }
    </TileWrapper>
  )
};

export default Tile;

import React from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  background: linear-gradient(321deg,rgba(107,181,86,0.8) 0%,rgba(108,193,199,0.8) 100%);
  border-radius: 30px;
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 8px;

  p {
    display: block;
    margin: 3px 0 0 -55px;
    padding: 0 10px 0;
    color: #fff;
  }

  .fill {
    margin-left: auto;
    background: #f5f5f5;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    height: 25px;
    vertical-align: center;

    p {
      padding: 0 0 0 5px;
    }
  }
`;

interface Props {
  percentage: number;
};

export default (props: Props) => {
  const fillWidth = `${100 - props.percentage}%`;
  let descriptionColor = '#fff';
  let descriptionMarginLeft = -70;

  if (props.percentage < 10) {
    descriptionMarginLeft = 0;
    descriptionColor = '#a7a7a7';
  }

  return (
    <ProgressBar>
      <div className="fill" style={{ width: `${fillWidth}` }}>
        <p style={{ color: descriptionColor, marginLeft: descriptionMarginLeft }}>{props.percentage}%</p>
      </div>
    </ProgressBar>
  );
};

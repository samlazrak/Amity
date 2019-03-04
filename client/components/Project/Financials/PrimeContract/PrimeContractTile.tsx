import React from 'react';
import { withRouter } from 'react-router-dom';
import Tile from '../../../Core/Tile';
import PrimeContractBreakdown from './PrimeContractBreakdown';
import { PrimeContract } from '../../../../../shared/types/financial';

interface Props {
  primeContract: PrimeContract;
  location: {
    pathname: string;
  };
};

const PrimeContract = (props: Props) => {
  const link = `${props.location.pathname}prime-contract`;

  return (
    <Tile
      title={props.primeContract.title}
      link={link}
      linkText="View Full Prime Contract"
    >
      <PrimeContractBreakdown primeContract={props.primeContract} />
    </Tile>
  );
};

// @ts-ignore
export default withRouter(PrimeContract);

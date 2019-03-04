import React from 'react';
import { withRouter } from 'react-router-dom';
import { PaymentApplication, PrimeContract } from '../../../../../shared/types/financial';
import Tile from '../../../Core/Tile';
import InvoicesTable from './InvoicesTable';
import InvoicesGraph from './InvoiceGraph/InvoicesGraph';

interface Props {
  paymentApplications: PaymentApplication[];
  primeContract: PrimeContract;
  location: {
    pathname: string;
  }
};

const InvoicesTile = (props: Props) => {
  return (
    <Tile title="Invoices">
      <div className="margin-top-25">
        <InvoicesGraph
          primeContract={props.primeContract}
          paymentApplications={props.paymentApplications}
        />
      </div>
      <InvoicesTable
        primeContract={props.primeContract}
        paymentApplications={props.paymentApplications}
      />
    </Tile>
  );
};

// @ts-ignore
export default withRouter(InvoicesTile);

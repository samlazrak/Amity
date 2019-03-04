import React from 'react';
import { Line } from 'react-chartjs-2';
import { getInvoiceGraphData, getInvoiceGraphOptions } from './InvoiceGraphConfig';
import {
  PaymentApplication,
  PrimeContract,
  PaymentReceived
} from '../../../../../../shared/types/financial';

interface Props {
  paymentApplications: PaymentApplication[];
  primeContract: PrimeContract;
};

const InvoicesGraph = (props: Props) => {
  const height = 140;
  const data = getInvoiceGraphData(props.primeContract, props.paymentApplications);
  const options = getInvoiceGraphOptions();

  return (
    <Line
      data={data}
      options={options}
      height={height}
    />
  );
};

export default InvoicesGraph;

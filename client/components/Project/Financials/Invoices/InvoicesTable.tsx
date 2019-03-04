import React from 'react';
import dateformat from 'dateformat';
import numeral from 'numeral';
import { toCurrency } from '../../../../utils/Strings';
import {
  PaymentApplication,
  PrimeContract,
  PaymentReceived
} from '../../../../../shared/types/financial';
import Table from '../../../Core/Table/Table';
import PaidColumn from './PaidColumn';

interface Props {
  paymentApplications: PaymentApplication[];
  primeContract: PrimeContract;
};

const InvoicesTable = (props: Props) => {
  const { paymentApplications, primeContract } = props;

  // Create a dictonary of payments for each invoice number
  const paymentsReceived: { [key: number]: PaymentReceived } = {};
  primeContract.paymentsReceived.forEach((paymentReceived: PaymentReceived) => {
    paymentsReceived[paymentReceived.invoiceNumber] = paymentReceived;
  });

  const columns = [
    {
      label: 'No.',
      key: 'invoiceNumber',
      width: '15%',
    },
    {
      label: 'Date',
      key: 'billingDate',
      width: '30%',
    },
    {
      label: 'Amount',
      key: 'paymentDue',
      width: '30%',
    },
    {
      label: 'Paid',
      key: 'paid',
      width: '15%',
    },
    {
      label: 'Percentage',
      key: 'percentage',
      width: '10%',
    }
  ];

  // Only show approved payment applications
  const approvedPaymentApps = paymentApplications.filter((payApp: PaymentApplication) => {
    return payApp.status === 'approved';
  });

  const rows = approvedPaymentApps.map((payApp: PaymentApplication) => {
    // Get the received payment for the current payment application
    const payment = paymentsReceived[payApp.invoiceNumber];

    return {
      billingDate: dateformat(payApp.billingDate, 'mm/dd/yyyy'),
      paymentDue: toCurrency(payApp.g702.currentPaymentDue),
      paid: (<PaidColumn paid={!!payment} />),
      percentage: numeral(payApp.percentComplete / 100).format('0.00%'),
      invoiceNumber: `#${payApp.invoiceNumber}`,
    };
  });

  return (
    <Table columns={columns} rows={rows} />
  );
};

export default InvoicesTable;

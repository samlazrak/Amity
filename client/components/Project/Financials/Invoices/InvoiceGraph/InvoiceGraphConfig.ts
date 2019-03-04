import numeral from 'numeral';
import {
  PaymentApplication,
  PrimeContract,
  PaymentReceived
} from './../../../../../../shared/types/financial';

/**
 * Creates a payment dictionary using invoice number as the key
 * Can be used to easily retreive a payment given an invoice number
 * return format: {
 *  1: <paymentForInvoice1>,
 *  2: <paymentForInvoice2>,
 * }
 * @param contract
 */
const getInvoicePaymentsMap = (contract: PrimeContract): { [key: number]: PaymentReceived } => {
  const payments: { [key: number]: PaymentReceived } = {};

  contract.paymentsReceived.forEach((payment: PaymentReceived) => {
    payments[payment.invoiceNumber] = payment;
  });

  return payments;
};

/**
 * Generates the x axis labels and y axis dataset values for invoices and payments
 * @param contract
 * @param payApps
 */
const getDataPoints = (contract: PrimeContract, payApps: PaymentApplication[]) => {
  const payments = getInvoicePaymentsMap(contract);
  const labels = [];
  const invoiceDataPoints = [];
  const paymentsDataPoints = [];
  let totalBilledSum = 0;
  let totalPaidSum = 0;

  payApps.forEach((payApp: PaymentApplication, i: number) => {
    const { invoiceNumber } = payApp;

    // sum the total billed up to this payApp
    totalBilledSum += payApp.g702.currentPaymentDue;
    // if there is not a payment for the payApp add 0 to the total paid amount
    totalPaidSum += payments[invoiceNumber] ? payments[invoiceNumber].amount : 0;

    // use the payApp index as the x value to evenly space invoices on the graph
    labels.push(i);

    invoiceDataPoints.push(totalBilledSum);
    paymentsDataPoints.push(totalPaidSum);
  });

  return {
    labels,
    invoiceDataPoints,
    paymentsDataPoints,
  };
};

/**
 * Generate the graph data for the invoice/payments graph
 * @param contract
 * @param payApps
 */
export const getInvoiceGraphData = (contract: PrimeContract, payApps: PaymentApplication[]) => {
  // ensure payment applications are sorted by date
  payApps.sort((a, b) => (new Date(a).getTime() - new Date(b).getTime()));
  const { labels, paymentsDataPoints, invoiceDataPoints } = getDataPoints(contract, payApps);
  const tension = 0;

  return (canvas: any) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 2);
    gradient.addColorStop(0, 'rgba(107,181,86,0.4)');
    gradient.addColorStop(1, 'rgba(108,193,199,0.7)');

    return {
      labels,
      datasets: [
        {
          tension,
          label: 'Payments',
          data: paymentsDataPoints,
          backgroundColor: gradient,
        },
        {
          tension,
          label: 'Invoices',
          data: invoiceDataPoints,
          backgroundColor: '#F5F5F5',
        },
      ],
    };
  };
};

export const getInvoiceGraphOptions = () => ({
  layout: {
    padding: {
      right: 20,
      bottom: 20,
    },
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      zeroLineColor: 'transparent',
      ticks: {
        display: false,
      },
      gridLines: {
        display: false,
        drawBorder: false,
      }
    }],
    yAxes: [{
      gridLines: {
        color: '#F5F5F5',
        drawBorder: false,
        zeroLineColor: 'transparent',
      },
      ticks: {
        fontFamily: '"Source Sans Pro"',
        beginAtZero: true,
        padding: 10,
        callback(v) {
          return numeral(v).format('$0.0a');
        },
      },
    }],
  },
});

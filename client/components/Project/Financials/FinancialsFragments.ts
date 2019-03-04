import gql from 'graphql-tag';

export const PrimeContractFragments = gql`
  fragment PrimeContractPagePrimeContract on PrimeContract {
    grandTotal
    title
    status
    totalPayments
    updatedAt
    lineItems {
      amount
      description
    }
  }
`;

export const ScheduleOfValuesFragments = gql`
  fragment ScheduleOfValuesPagePaymentApplication on PaymentApplication {
    periodStart
    periodEnd
    percentComplete
    g703 {
      balanceToFinish
      scheduledValue
      descriptionOfWork
      totalCompletedAndStoredToDate
    }
  }
`;

export const InvoiceFragments = gql`
  fragment InvoicePagePrimeContract on PrimeContract {
    paymentsReceived {
      createdAt
      invoiceNumber
      amount
    }
  }

  fragment InvoicePagePaymentApplication on PaymentApplication {
    invoiceNumber
    periodStart
    periodEnd
    status
    billingDate
    percentComplete
    g702 {
      currentPaymentDue
    }
  }
`;

export interface PrimeContractLineItem {
  amount: number;
  description: string;
};

export interface PaymentReceived {
  createdAt: string;
  invoiceNumber: number;
  amount: number;
};

export interface PrimeContract {
  grandTotal: number;
  totalPayments: number;
  updatedAt: string;
  title: string;
  status: string;
  lineItems: PrimeContractLineItem[];
  paymentsReceived: PaymentReceived[];
};

export interface g702 {
  currentPaymentDue: number;
};

export interface g703 {
  balanceToFinish: number;
  scheduledValue: number;
  descriptionOfWork: string;
  totalCompletedAndStoredToDate: number;
};

export interface PaymentApplication {
  periodStart: string;
  periodEnd: string;
  percentComplete: number;
  status: string;
  billingDate: string;
  invoiceNumber: number;
  g702: g702;
  g703: g703[];
};

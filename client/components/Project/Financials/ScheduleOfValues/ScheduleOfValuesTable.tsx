import React from 'react';
import Table from '../../../Core/Table/Table';
import { PaymentApplication, g703 } from '../../../../../shared/types/financial';
import { toCurrency } from '../../../../utils/Strings';

interface Props {
  limitTo: number;
  paginate: boolean;
  paymentApplicaton: PaymentApplication;
  sticky?: boolean;
};

const ScheduleOfValuesTable = (props: Props) => {
  const { sticky, paginate } = props;

  const columns = [
    {
      label: 'Description',
      key: 'description',
      width: '45%',
    },
    {
      label: 'Amount',
      key: 'contractAmount',
      width: '20%',
    },
    {
      label: 'Billed',
      key: 'billed',
      width: '20%',
    },
    {
      label: 'Remaining',
      key: 'remaining',
      width: '15%',
    }
  ];

  const rows = props.paymentApplicaton.g703.map((lineItem: g703) => ({
    description: lineItem.descriptionOfWork,
    contractAmount: toCurrency(lineItem.scheduledValue),
    billed: toCurrency(lineItem.totalCompletedAndStoredToDate),
    remaining: toCurrency(lineItem.balanceToFinish),
  }));

  return (
    <Table sticky={sticky} numberToShow={props.limitTo} columns={columns} rows={rows} />
  );
};

export default ScheduleOfValuesTable;

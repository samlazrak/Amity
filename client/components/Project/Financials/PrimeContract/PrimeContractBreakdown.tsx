import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import AnimatedNumber from 'react-animated-number';
import dateformat from 'dateformat';
import { PrimeContract } from '../../../../../shared/types/financial';
import Label from '../../../Core/Label';

const PrimeContractBreakdown = styled.div`
  .currency-amount {
    float: left;
    margin-right: 40px;

    h4.amount {
      font-weight: 500;
      padding: 0;
      margin: 0 0 10px;
      font-size: 20px;
    }

    &.large {
      h4.amount {
        font-size: 28px;
      }
    }
  }

  .breakdown-row {
    clear: both;
    overflow: auto;
  }
`;

interface Props {
  primeContract: PrimeContract;
}

export default (props: Props) => {
  const { primeContract } = props;
  const percentagePaid = primeContract.totalPayments / primeContract.grandTotal;

  const contractTotalStyle = {
    fontFamily: '"Source Sans Pro"',
    color: '#000',
    fontSize: '28px',
    margin: '0 0 10px',
    padding: '0px',
    fontWeight: '500',
  };

  return (
    <PrimeContractBreakdown>
      <div className="currency-amount large margin-top-10">
        <Label>Grand Total</Label>
        <AnimatedNumber
          component="h4"
          initialValue={primeContract.grandTotal * .98}
          value={primeContract.grandTotal}
          style={contractTotalStyle}
          duration={900}
          formatValue={n => numeral(n).format('$0,00.00')}
        />
      </div>
      <div className="breakdown-row">
        <div className="currency-amount margin-top-10">
          <Label>Total Payments</Label>
          <h4 className="amount">{numeral(primeContract.totalPayments).format('$0,0.00')}</h4>
        </div>
        <div className="currency-amount margin-top-10">
          <Label>Last Updated</Label>
          <h4 className="amount">{dateformat(props.primeContract.updatedAt, 'mm/dd/yyyy')}</h4>
        </div>
        <div className="currency-amount margin-top-10">
          <Label>Percentage Paid</Label>
          <h4 className="amount">{numeral(percentagePaid).format('0.00%')}</h4>
        </div>

      </div>
    </PrimeContractBreakdown>
  );
};

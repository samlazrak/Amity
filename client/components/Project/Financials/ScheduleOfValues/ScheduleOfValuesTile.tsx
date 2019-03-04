import React from 'react';
import { withRouter } from 'react-router-dom';
import Tile from '../../../Core/Tile';
import { PaymentApplication } from '../../../../../shared/types/financial';
import ProgressBar from '../../../Core/ProgressBar';
import Label from '../../../Core/Label';
import ScheduleOfValuesTable from './ScheduleOfValuesTable';

interface Props {
  paymentApplication?: PaymentApplication;
  location: {
    pathname: string;
  };
};

const PrimeContract = (props: Props) => {
  const link = `${props.location.pathname}/schedule-of-values`;

  if (!props.paymentApplication) return null;

  return (
    <Tile title="Schedule Of Values" link={link} linkText="View Schedule of Values">
      <div className="margin-top-15">
        <Label>Percentage Complete</Label>
        <ProgressBar percentage={props.paymentApplication.percentComplete} />
      </div>
      <div className="margin-top-15">
        <ScheduleOfValuesTable
          paymentApplicaton={props.paymentApplication}
          limitTo={10}
          paginate={false}
        />
      </div>
    </Tile>
  );
};

// @ts-ignore
export default withRouter(PrimeContract);

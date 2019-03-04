import React from 'react';
import Grid from '../../../Core/Grid/Grid';
import gql from 'graphql-tag';
import { Query } from 'react-apollo' ;
import Column from '../../../Core/Grid/Column';
import PrimeContractTile from '../PrimeContract/PrimeContractTile';
import ScheduleOfValuesTile from '../ScheduleOfValues/ScheduleOfValuesTile';
import InvoicesTile from '../Invoices/InvoicesTile';

import {
  PrimeContractFragments,
  ScheduleOfValuesFragments,
  InvoiceFragments,
} from '../FinancialsFragments';

// All fields for the overview query are stored in financial fragments (../FinancialsFragments)
const OverviewQuery = gql`
  query financialsQuery($projectId: String!) {
    primeContract(projectId: $projectId) {
      ...PrimeContractPagePrimeContract
      ...InvoicePagePrimeContract
    }
    paymentApplication(projectId: $projectId) {
      ...ScheduleOfValuesPagePaymentApplication
    }
    paymentApplications(projectId: $projectId) {
      ...InvoicePagePaymentApplication
    }
  }
  ${PrimeContractFragments}
  ${ScheduleOfValuesFragments}
  ${InvoiceFragments}
`;

interface Props {
  match: {
    params: {
      projectId: string;
    };
  };
};

export default (props: Props) => {
  const { projectId } = props.match.params;

  return (
    <Query query={OverviewQuery} variables={{ projectId }}>
      {({ error, loading, data }) => {
        if (error) return error.message;
        if (loading) return null;

        return (
          <Grid columnsMobile="1fr" columns="1fr 1fr">
            <Column>
              <PrimeContractTile primeContract={data.primeContract} />
              <InvoicesTile
                primeContract={data.primeContract}
                paymentApplications={data.paymentApplications}
              />
            </Column>
            <Column>
              <ScheduleOfValuesTile paymentApplication={data.paymentApplication} />
            </Column>
          </Grid>
        );
      }}
    </Query>
  );
};

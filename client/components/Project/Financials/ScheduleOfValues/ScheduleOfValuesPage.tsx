import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { ScheduleOfValuesFragments } from '../FinancialsFragments';
import Tile from '../../../Core/Tile';
import Label from '../../../Core/Label';
import ProgressBar from '../../../Core/ProgressBar';
import ScheduleOfValuesTable from './ScheduleOfValuesTable';

const ScheduleOfValuesQuery = gql`
  query scheduleOfValuesQuery($projectId: String!) {
    paymentApplication(projectId: $projectId) {
      ...ScheduleOfValuesPagePaymentApplication
    }
  }
  ${ScheduleOfValuesFragments}
`;

const ScheduleOfValuesPage = styled.div`
  padding: 24px;

  .percentage-complete {
    p {
      margin-bottom: 10px;
    }
  }
`;

interface Props {
  match: {
    params: {
      projectId: String;
    };
  };
};

export default (props: Props) => {
  return (
    <Query query={ScheduleOfValuesQuery} variables={{ projectId: props.match.params.projectId }}>
      {({ error, loading, data }) => {
        if (error) return error.message;
        if (loading) return null;

        return (
          <ScheduleOfValuesPage>
            <Tile title="Schedule Of Values">
              <div className="percentage-complete margin-top-20 margin-bottom-15">
                <Label>Total Percentage Complete</Label>
                <ProgressBar percentage={data.paymentApplication.percentComplete} />
              </div>
            </Tile>
            <Tile title="Breakdown">
              <div className="margin-top-15">
                <ScheduleOfValuesTable
                  sticky={true}
                  limitTo={1000}
                  paginate={true}
                  paymentApplicaton={data.paymentApplication}
                />
              </div>
            </Tile>
          </ScheduleOfValuesPage>
        )
      }}
    </Query>
  );
};

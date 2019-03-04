import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Topbar from '../../Topbar/Topbar';
import TopbarMenu from '../../Topbar/TopbarMenu';
import { Project } from '../../../../shared/types/project';
import { getFinancialsLinks } from './FinancialsLinks';
import Overview from './Overview/FinancialOverviewPage';
import NotFound from '../../Core/NotFound';
import ScheduleOfValuesPage from './ScheduleOfValues/ScheduleOfValuesPage';

interface Props {
  project: Project;
};

export default (props: Props) => {
  return (
    <div className="financials">
      <Topbar title="Financials" secondaryTitle={props.project.name} />
      <TopbarMenu links={getFinancialsLinks(props.project.id)} />
      <Switch>
        <Route path="/project/:projectId/prime-contract" component={null} />
        <Route path="/project/:projectId/schedule-of-values" component={ScheduleOfValuesPage} />
        <Route path="/project/:projectId" exact component={Overview} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};


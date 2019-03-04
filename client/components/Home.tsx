import React from 'react';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { userIsSignedIn, setPostAuthRedirect } from '../utils/Authentication';
import Sidebar from './Sidebar/Sidebar';
import Projects from './Projects/Projects';
import MobileHeader from './Sidebar/Mobile/MobileHeader';
import Project from './Project/Project';
import NotFound from './Core/NotFound';

const HomeWrapper = styled.div`
  height: 100%;
  overflow: hidden;

  .container {
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  }

  @media screen and (min-width: 55em) {
    .container {
      width: calc(100% - 270px);
      position: absolute;
      left: 270px;
      top: 0;
      height: 100vh;
      overflow-y: scroll;
    }
  }
`;

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    if (!userIsSignedIn()) {
      setPostAuthRedirect(this.props.location.pathname);
      props.history.push('/login');
    }
  }

  render() {
    if (!userIsSignedIn()) return null;

    return (
      <HomeWrapper>
        <MobileHeader />
        <Sidebar />
        <div className="container">
          <Switch>
            <Route path="/project/:projectId" component={Project} />
            <Route path="/" exact component={Projects} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </HomeWrapper>
    );
  }
}

export default withRouter(Home);

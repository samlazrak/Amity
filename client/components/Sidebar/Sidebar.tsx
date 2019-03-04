import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Logo from './Logo';
import SettingsMenu from './SettingsMenu';
import ProjectSwitcher from './ProjectSwitcher/ProjectSwitcher';
import MobileToggle from './Mobile/MobileToggle';
import RootNavigation from './Navigation/RootNavigation';
import ProjectNavigation from './Navigation/ProjectNavigation';

const SidebarWrapper = styled.div`
  width: 100%;

  .sidebar {
    display: none;
    width: 100%;
    z-index: 100;
    position: relative;
    height: 100%;
    background: linear-gradient(321deg, rgba(107,181,86,1) 0%, rgba(108,193,199,1) 100%);
    float: left;
    padding-top: 70px;

    &.show-sidebar {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 325;
    }
  }

  @media screen and (min-width: 55em) {
    height: 100%;
    .toggle-sidebar {
      display: none;
    }

    .sidebar {
      padding-top: 0;
      display: flex;
      flex-direction: column;
      background: linear-gradient(321deg, rgba(107,181,86,0.9) 0%, rgba(108,193,199,0.9) 100%);
      width: 270px;

      &.show-sidebar {
        display: flex;
        position: inherit;
      }
    }
  }
`;

interface State {
  show: boolean;
};


class Sidebar extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggleSidebar = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {

    const ProjectLinks = (props: any) => (
      <ProjectNavigation toggleSidebar={this.toggleSidebar} {...props} />
    );

    const RootLinks = (props: any) => (
      <RootNavigation toggleSidebar={this.toggleSidebar} {...props} />
    );

    return (
      <SidebarWrapper>
        <MobileToggle isOpen={this.state.show} onClick={this.toggleSidebar} />
        <div className={this.state.show ? 'sidebar show-sidebar' : 'sidebar'}>
          <Logo />
          <ProjectSwitcher toggleSidebar={this.toggleSidebar} />
          <Switch>
            <Route path="/project/:projectId" component={ProjectLinks} />
            <Route component={RootLinks} />
          </Switch>
          <SettingsMenu />
        </div>
      </SidebarWrapper>
    );
  }
}

export default Sidebar;

import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SwitcherMenu from './SwitcherMenu';
import Dimmer from '../../Core/Dimmer';
import { truncateText } from '../../../utils/Strings';

const ProjectSwitcherWrapper = styled.div`
  .switcher {
    margin: 15px auto 15px;
    background: rgba(255, 255, 255, 0.1);
    width: 90%;
    padding: 20px;
    border-radius: 5px;
    overflow: auto;
    user-select: none;
    cursor: pointer;


    p {
      color: #fff;
      margin: 0;
      padding: 0;
      float: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: calc(100% - 30px);
    }

    .expand-switcher {
      width: 20px;
      color: #fff;
      float: right;
    }
  }
`;

const ProjectsQuery = gql`
  {
    projects {
      id
      name
    }
  }
`;

interface Props {
  toggleSidebar: Function;
  location: {
    pathname: string;
  }
};

interface State {
  display: boolean;
};

class ProjectSwitcher extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }

  toggleMenu = () => {
    this.setState({
      display: !this.state.display,
    });
  }

  handleProjectSwitch = () => {
    this.props.toggleSidebar();
    this.toggleMenu();
  }

  getTitle = (projects) => {
    const { pathname } = this.props.location;
    let title = 'Select Project...';

    projects.forEach(({ id, name}) => {
      if (pathname.indexOf(id) !== -1) {
        title = name;
        return false;
      }
    });

    return title;
  }

  render() {
    return (
      <Query query={ProjectsQuery}>
        {({ error, data, loading }) => {
          if (error) return error;
          if (loading) return loading;
          if (!data.projects.length) return null;

          return (
            <ProjectSwitcherWrapper>
              <div className="switcher" onClick={this.toggleMenu}>
                <p>{this.getTitle(data.projects)}</p>
                <div className="expand-switcher">
                  <FontAwesomeIcon
                    icon={{ prefix: 'far', iconName: 'chevron-down' }}
                  />
                </div>
              </div>
              {this.state.display &&
                <div>
                  <Dimmer onClick={this.toggleMenu} />
                  <SwitcherMenu
                    projects={data.projects}
                    toggleMenu={this.toggleMenu}
                    onClick={this.handleProjectSwitch}
                  />
                </div>
              }
            </ProjectSwitcherWrapper>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ProjectSwitcher);

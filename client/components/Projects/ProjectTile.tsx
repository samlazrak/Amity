import React from 'react';
import styled from 'styled-components';
import { withRouter} from 'react-router-dom';

const ProjectTileWrapper = styled.div`
  h3 {
    font-weight: normal;
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    margin: 0 0 10px;
    padding: 0;
  }
`;

interface Props {
  project: {
    id: String;
    displayName: String;
    name: String;
    address: String;
    city: String;
    stateCode: String;
    zip: String;
  };
  history: {
    push: Function;
  };
};

class ProjectTile extends React.Component<Props, any> {
  handleClick = () => {
    this.props.history.push(`/project/${this.props.project.id}`);
  }

  render() {
    const { project } = this.props;
    return (
      <ProjectTileWrapper className="tile shadow padded margin-bottom-20 clickable" onClick={this.handleClick}>
        <h3 className="text-black">{project.displayName}</h3>
        <p className="text-gray">
          {project.address}, {project.city}, {project.stateCode} {project.zip}
        </p>
      </ProjectTileWrapper>
    );
  }
}

// @ts-ignore
export default withRouter(ProjectTile);


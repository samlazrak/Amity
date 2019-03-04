import React from 'react';
import ProjectTile from './ProjectTile';
import PageError from '../Core/PageError';
import { Project } from '../../../shared/types/project';

interface Props {
  projects: Project[]
};

const ProjectList = (props: Props) => {
  if (!props.projects.length) {
    return (
      <PageError
        message="Hmm, it looks like you don't have any projects yet."
      />
    );
  }

  return (
    <div className="project-list">
      {props.projects.map((project) => (
        <ProjectTile key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;

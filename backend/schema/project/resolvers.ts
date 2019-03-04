import ProjectAPI from '../../api/project';
import wrap from '../utils/wrap';
import { restrictToUser } from '../../authentication/middleware';

export default {
  Query: {
    project: wrap(restrictToUser, ProjectAPI.getProject),
    projects: wrap(restrictToUser, ProjectAPI.getProjectsForUser),
  },
};

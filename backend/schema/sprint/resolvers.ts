import SprintAPI from '../../api/sprint';
import wrap from '../utils/wrap';
import { restrictToUser } from '../../authentication/middleware';

export default {
  Query: {
    sprintIssues: wrap(restrictToUser, SprintAPI.getIssuesForProject),
  },
  SprintFields: {
    category: (fields: any) => fields.status.name,
    priority: (fields: any) => fields.priority.name.toLowerCase(),
  },
};

import { Context } from './../../shared/types/authentication';
import config from 'config';
import ProcoreIntegration from '../integrations/procore';
import ApiCache from '../cache/api-cache';
import { parallelFetch } from '../utils/network';

class ProjectAPI {
  private static companyId: string = config.get('procore.companyId');

  /**
   * Fetches every project from Procore
   * @param args
   */
  public static async getAllProjects(args: any) {
    const projects = await ProcoreIntegration.get({
      url: '/vapid/projects',
      queryParams: {
        companyId: ProjectAPI.companyId,
      },
    });

    return projects;
  }

  /**
   * Fetches a list of users for a single Procore project
   * returns a email:boolean dictionary for easy filtering
   * e.g. [
   *    'jdoe@creaturebuilds.com': true,
   *    'snelson@creaturebuilds.com': true,
   * ]
   * @param args
   */
  public static async getUsersForProject(args: { projectId: string }) {
    const userMap: { [key:string]: boolean } = {};
    const users = await ProcoreIntegration.get({
      url: `/vapid/projects/${args.projectId}/users`,
    });

    // create map of users for the project based on their email
    users.map((user: any) => {
      userMap[user.emailAddress] = true;
    });

    return userMap;
  }

  /**
   * Fetches a list of projects that the current user has access to
   * @param args
   * @param context
   */
  public static async getProjectsForUser(args: any, context: Context) {
    const email = context.user.get('email');
    const projects = await ProjectAPI.getAllProjects({});
    await Promise.all(projects.map(async (project: any) => {
      project.users = await ProjectAPI.getUsersForProject({ projectId: project.id });
    }));

    return projects.filter((project: any) => project.users[email]);
  }

  /**
   * Fetches a single project from Procore
   * @param args
   * @param context
   */
  public static async getProject(args: { projectId: string }, context: Context) {
    const project = await parallelFetch({
      users: ProjectAPI.getUsersForProject({ projectId: args.projectId }),
      data: ProcoreIntegration.get({
        url: `/vapid/projects/${args.projectId}`,
        queryParams: {
          companyId: ProjectAPI.companyId,
        },
      }),
    });

    // User must have project permissions
    if (!project.users[context.user.get('email')]) {
      throw new Error('Invalid permissions.');
    }

    return project.data;
  }
}

export default ApiCache.cachify(ProjectAPI, 'ProjectAPI', {
  getProject: {
    ttl: '30m',
    useContext: true,
  },
  getProjectsForUser: {
    ttl: '3m',
    useContext: true,
  }
});

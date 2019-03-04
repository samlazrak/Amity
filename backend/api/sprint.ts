import config from 'config';
import { Context } from '../../shared/types/authentication';
import JiraIntegration from '../integrations/jira';
import ApiCache from '../cache/api-cache';

class SprintAPI {
  private static boardId: string = config.get('jira.defaultBoardId');
  private static maxIssueResults: number = config.get('jira.maxIssueResults');

  /**
   * Gets all epics for a Jira board
   * @param args
   * @param context
   */
  private static async getAllEpics(args: { boardId: string }, context: Context) {
    const epicData = await JiraIntegration.get({
      url: `/rest/agile/1.0/board/${args.boardId}/epic`,
    });

    return epicData.values || [];
  }

  /**
   * Gets the epic (if any) associated with a particular Procore project
   * @param args
   * @param context
   */
  private static async getEpicForProject(args: { projectId: string }, context: Context) {
    const boardId = SprintAPI.boardId;
    const epics = await SprintAPI.getAllEpics({ boardId }, context);
    let projectEpic = null;

    epics.forEach((epic) => {
      if (epic.summary.trimStart() === args.projectId) {
        projectEpic = epic;
        return false;
      }
    });

    return projectEpic;
  }

  /**
   * Gets all Jira issues for a particular Procore project
   * We use epics to seperate Procore projects within the main Office Scrum board
   * @param args
   * @param context
   */
  public static async getIssuesForProject(args: { projectId: string }, context: Context) {
    const { projectId } = args;
    const epicForProject = await SprintAPI.getEpicForProject({ projectId }, context);

    if (!epicForProject) {
      return [];
    }

    const issuesData = await JiraIntegration.get({
      url: `/rest/agile/1.0/board/${SprintAPI.boardId}/epic/${epicForProject.id}/issue`,
      queryParams: {
        maxResults: SprintAPI.maxIssueResults,
        fields: 'summary, status, sprint, priority',
      },
    });

    return issuesData.issues.filter((issue) => {
      return !!issue.fields.sprint;
    });
  }
}

export default ApiCache.cachify(SprintAPI, 'SprintAPI', {
  getIssuesForProject: {
    ttl: '3m',
    useContext: false,
  },
});

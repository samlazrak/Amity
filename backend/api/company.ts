import { BambooProfile } from './../../shared/types/authentication';
import BambooIntegration from '../integrations/bamboo';
import ApiCache from '../cache/api-cache';

class CompanyAPI {
  private static directoryKey: string = 'bamboo-directory';

  /**
   * Gets a dictionary of all BambooHR profiles with emails as the keys
   */
  public static async getDirectory() {
    const employees = (await BambooIntegration.get({ url: '/employees/directory' })).employees;
    const directory: { [key:string]: BambooProfile; } = {};
    employees.forEach((employee: BambooProfile) => { directory[employee.workEmail] = employee });

    return directory;
  }

  /**
   * Gets a user's BambooHR profile
   * @param {Object} args email address of user
   */
  public static async getBambooProfile(args: { email: string }): Promise<BambooProfile|null> {
    const directory = await CompanyAPI.getDirectory();

    return directory[args.email];
  }
}

export default ApiCache.cachify(CompanyAPI, 'CompanyAPI', {
  getBambooProfile: {
    ttl: '30m',
    useContext: false,
  },
});

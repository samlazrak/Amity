import { Context } from './../../shared/types/authentication';
import ProcoreIntegration from '../integrations/procore';
import ApiCache from '../cache/api-cache';

class FinancialAPI {
  /**
   * Fetches the prime contract for a project
   * @param args
   * @param conext
   */
  public static async getPrimeContract(args: { projectId: string }, conext: Context) {
    const primeContract = await ProcoreIntegration.get({
      url: '/vapid/prime_contract',
      queryParams: {
        projectId: args.projectId
      },
    });

    return primeContract;
  }

  /**
   * Fetches a list of payment applications for a project
   * @param args
   * @param context
   */
  public static async getPaymentApplications(args: { projectId: String}, context: Context) {
    const paymentApplications: any = await ProcoreIntegration.get({
      url: `/vapid/payment_applications`,
      queryParams: {
        projectId: args.projectId,
      },
    });

    return paymentApplications;
  }

  /**
   * Fetches the most recent/complete payment application for a project
   * Procore only returns partial data when fetching a payment applications list, so
   * we have to fetch the list, and then fetch a more detailed view for the most recent
   * payment application
   * @param args
   * @param context
   */
  public static async getPaymentApplication(args: { projectId: String }, context: Context) {
    const paymentApplications = await FinancialAPI.getPaymentApplications(args, context);

    if (paymentApplications.length) {
      const paymentApplication = paymentApplications[paymentApplications.length - 1];

      return ProcoreIntegration.get({
        url: `/vapid/payment_applications/${paymentApplication.id}`,
        queryParams: {
          projectId: args.projectId,
        },
      });
    }

    return null;
  }
}

export default ApiCache.cachify(FinancialAPI, 'FinancialAPI', {
  getPrimeContract: {
    ttl: '5m',
    useContext: false,
  },
  getPaymentApplications: {
    ttl: '5m',
    useContext: false,
  },
  getPaymentApplication: {
    ttl: '5m',
    useContext: false,
  },
});

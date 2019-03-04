import wrap from '../utils/wrap';
import { restrictToUser, restrictTo, restrictToSuper } from '../../authentication/middleware';
import FinancialAPI from '../../api/financial';

export default {
  Query: {
    primeContract: wrap(restrictToUser, FinancialAPI.getPrimeContract),
    paymentApplication: wrap(restrictToUser, FinancialAPI.getPaymentApplication),
    paymentApplications: wrap(restrictToUser, FinancialAPI.getPaymentApplications),
  }
};

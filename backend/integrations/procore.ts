import axios from 'axios';
import config from 'config';
import Integration from './integration';
import cache from '../cache';

const ProcoreAxios = axios.create({
  baseURL: config.get('procore.baseUrl'),
});

const getHeaders = async () => {
  const cachedHeaders = await cache.getJSON('procore-headers');
  if (cachedHeaders) return cachedHeaders;

  try {
    const params = config.get('procore.auth');
    const tokens: any = (await axios.post(config.get('procore.authUrl'), params)).data;
    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
      'Procore-Company-Id': config.get('procore.companyId'),
    };
    process.nextTick(() => {
      cache.setJSON('procore-headers', headers, '1h');
    });

    return headers;
  } catch (e) {
    console.log(e);
    throw new Error('Unable to fetch Procore auth token.');
  }
};

const ProcoreIntegration = new Integration({
  axiosInstance: ProcoreAxios,
  convertRequestToSnakeCase: true,
  convertResponseToCamelCase: true,
  getHeaders,
});

export default ProcoreIntegration;

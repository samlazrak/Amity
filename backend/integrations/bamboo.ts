import axios from 'axios';
import config from 'config';
import Integration from './integration';

const BambooAxios = axios.create({
  baseURL: config.get('bamboo.baseUrl'),
  headers: {
    Accept: 'application/json',
    Authorization: `Basic ${config.get('bamboo.key')}`,
  },
});

const BambooIntegration = new Integration({
  axiosInstance: BambooAxios,
  convertRequestToSnakeCase: false,
  convertResponseToCamelCase: false,
});

export default BambooIntegration;

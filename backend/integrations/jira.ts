import axios from 'axios';
import config from 'config';
import Integration from './integration';

const JiraAxios = axios.create({
  baseURL: config.get('jira.baseUrl'),
  headers: {
    Accept: 'application/json',
  },
  auth: {
    username: config.get('jira.username'),
    password: config.get('jira.password'),
  }
});

const JiraIntegration = new Integration({
  axiosInstance: JiraAxios,
  convertRequestToSnakeCase: false,
  convertResponseToCamelCase: false,
});

export default JiraIntegration;

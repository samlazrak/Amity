import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { toSnakeCase, toCamelCase } from '../utils/case-converter';

/**
 * Configurations for every request the integration makes
 */
export interface IntegrationConfig {
  getHeaders?: Function;
  convertRequestToSnakeCase: boolean;
  convertResponseToCamelCase: boolean;
  axiosInstance?: AxiosInstance;
};

/**
 * Options for each individual request the integreation makes
 */
export interface RequestOptions {
  url: string;
  queryParams?: object;
  urlParams?: object;
  data?: object;
};

/**
 * Streamlines fetching data from third-party REST APIs
 */
class Integration {
  private getHeaders?: Function;
  private convertRequestToSnakeCase: boolean;
  private convertResponseToCamelCase: boolean;
  private axiosInstance: AxiosInstance;

  /**
   * Initializes integration with default config settings
   * e.g. Base URL, formatting options, custom headers
   * Sets a default axios instance if one is not passed as an arguemnt
   * @param {IntegrationConfig} config
   */
  constructor(config: IntegrationConfig) {
    this.getHeaders = config.getHeaders;
    this.convertRequestToSnakeCase = config.convertRequestToSnakeCase;
    this.convertResponseToCamelCase = config.convertResponseToCamelCase;
    this.axiosInstance = config.axiosInstance || axios;
  }

  /**
   * Makes an API request using integration config settings
   * @param {string} method get or set
   * @param {RequestOptions} options axios configuration options for the request
   */
  private async makeRequest(method: string, options: RequestOptions): Promise<any> {
    if (!options.url) {
      throw new Error('URL is required to make a request.');
    }

    // TODO - Replace url params in url string

    const requestConfig: AxiosRequestConfig = {
      method,
      url: options.url,
      data: this.formatRequestData(options.data || {}),
      params: this.formatRequestData(options.queryParams || {}),
      headers: this.getHeaders ? (await this.getHeaders()) : {},
    };

    // make the request
    const response = await this.axiosInstance(requestConfig);

    return this.handleResponse(response);
  }

  /**
   * Transforms the request params or form data before making a request
   * Helpful for APIs that require snake case params, etc.
   * @param {Object} data request params or data
   */
  protected formatRequestData(data: Object): Object {
    return this.convertRequestToSnakeCase ?
      toSnakeCase(data) :
      data;
  }

  /**
   * Transforms the response data after the request has been made
   * Helpful for APIs that return a snake case object that we want in camel case, etc.
   * @param data
   */
  protected formatResponseData(data: Object): Object {
    return this.convertResponseToCamelCase ?
      toCamelCase(data) :
      data;
  }

  /**
   * Put any post request data manipulation or logging here
   * @param {AxiosResponse} response
   */
  protected handleResponse(response: AxiosResponse): Object {
    return this.formatResponseData(response.data);
  }

  /**
   * Makes a get request on the integration's API
   * @param {RequestOptions} options
   */
  public async get(options: RequestOptions): Promise<any> {
    return this.makeRequest('get', options);
  }

  /**
   * Makes a post request on the integration's API
   * @param {RequestOptions} options
   */
  public async post(options: RequestOptions): Promise<any> {
    return this.makeRequest('post', options);
  }
}

export default Integration;

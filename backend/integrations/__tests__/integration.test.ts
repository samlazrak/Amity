import axios from 'axios';
import Integration, { RequestOptions } from '../integration';
import { toSnakeCase, toCamelCase } from '../../utils/case-converter';

jest.mock('axios');
jest.mock('../../utils/case-converter');

describe('Integration', () => {
  let testIntegration: any;
  let requestOptions: RequestOptions;
  let getHeaders: jest.Mock;

  beforeEach(() => {
    // @ts-ignore
    axios.mockReturnValue(Promise.resolve({
      data: {
        test_value: 12,
        list_value: [1, 2, 3],
      }
    }));

    getHeaders = jest.fn().mockReturnValue({ Authorization: 'Bearer ABCD'});
    testIntegration = new Integration({
      getHeaders,
      convertRequestToSnakeCase: true,
      convertResponseToCamelCase: true,
    });

    requestOptions = {
      url: '/projects',
      queryParams: {},
      data: {},
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe('get and post methods', () => {
    beforeEach(() => {
      jest.spyOn(testIntegration as any, 'makeRequest');
    });

    test('Get method should call makeRequest with get string', () => {
      testIntegration.get(requestOptions);
      expect(testIntegration.makeRequest).toHaveBeenCalledWith('get', requestOptions);
    });

    test('Post method should call makeRequest with post string', () => {
      testIntegration.post(requestOptions);
      expect(testIntegration.makeRequest).toHaveBeenCalledWith('post', requestOptions);
    });
  });

  describe('MakeRequest with formatting', () => {
    beforeEach(() => {
      jest.spyOn(testIntegration as any, 'formatRequestData');
      jest.spyOn(testIntegration as any, 'formatResponseData');
      jest.spyOn(testIntegration as any, 'handleResponse');
    });

    test('makeRequest should format options for axios and make request', (async () => {
      await testIntegration.get(requestOptions);
      expect(getHeaders).toBeCalledTimes(1);
      expect(testIntegration.formatRequestData).toBeCalledTimes(2);
      expect(testIntegration.formatRequestData).toHaveBeenNthCalledWith(1, requestOptions.queryParams);
      expect(testIntegration.formatRequestData).toHaveBeenNthCalledWith(2, requestOptions.data);
      expect(testIntegration.formatResponseData).toBeCalledTimes(1);

      expect(toSnakeCase).toHaveBeenCalled();
      expect(toCamelCase).toHaveBeenCalled();

      expect(axios).toHaveBeenCalledTimes(1);

      // @ts-ignore
      expect(axios.mock.calls[0][0]).toMatchObject({
        method: 'get',
        url: '/projects',
        data: {},
        params: {},
        headers: { Authorization: 'Bearer ABCD'},
      });
    }));

    test('Should throw an error if there is no URL present in the options', (async (done) => {
      delete requestOptions.url;
      try {
        await testIntegration.get(requestOptions);
        throw new Error('Integration validation passed without URL in options.');
      } catch(e) {
        expect(e).toBeInstanceOf(Error);
        done();
      }
    }));

    test('Should autoset params and data', (async () => {
      await testIntegration.get({ url: '/base' });
      expect(testIntegration.formatRequestData).toBeCalledTimes(2);
      expect(testIntegration.formatResponseData).toBeCalledTimes(1);
    }));
  });

  describe('formatRequestData and formatResponseData', () => {
    test('Should return response data without transforming it', () => {
      testIntegration = new Integration({
        convertRequestToSnakeCase: false,
        convertResponseToCamelCase: false,
      });

      expect(toSnakeCase).toHaveBeenCalledTimes(0);
      expect(toCamelCase).toHaveBeenCalledTimes(0);
    });
  });
});

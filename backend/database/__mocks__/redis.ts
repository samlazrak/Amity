class MockRedisClient {
  private data: any;
  private mocks: any;

  constructor() {
    this.data = {};
    this.mocks = {
      set: jest.fn(),
      get: jest.fn(),
    };
  }

  set(key, mockData) {
    this.data[key] = mockData;
    this.mocks.set(key, mockData);
    return Promise.resolve();
  }

  resetData() {
    this.data = {};
  }

  resetMocks() {
    Object.keys(this.mocks).forEach((key) => {
      this.mocks[key] = jest.fn();
    });
  }

  getMocks() {
    return this.mocks;
  }

  get(key) {
    this.mocks.get(key);
    return Promise.resolve(this.data[key]);
  }
}

export default {
  createClient() {
    return new MockRedisClient();
  },
};

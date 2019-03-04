const sign = jest.fn();
const verify = jest.fn();

jest.doMock('jsonwebtoken', () => { return { sign, verify }});

import Tokens from '../tokens';

describe('Tokens', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    sign.mockReturnValue('fake-token');
  });

  test('Token generation', () => {
    const fakeData = {
      email: 'jdoe@creaturebuilds.com',
      name: 'John Doe',
      exp: '2h',
    };

    const token = Tokens.generateToken(fakeData);

    expect(sign).toHaveBeenCalledTimes(1);
    expect(sign.mock.calls[0][0]).toMatchObject(Object.assign({}, fakeData, { exp: '2h' }));
    expect(sign.mock.calls[0][1]).toBe('jwt-cert');
    expect(sign.mock.calls[0][2]).toMatchObject({
      algorithm: 'RS256',
    });
  });

  test('Token verification', (done) => {
    const verification = Tokens.verifyToken('abc');

    verification
      .then((decoded) => {
        expect(decoded).toBe('dwt');
        done();
      });

    expect(verify).toHaveBeenCalledTimes(1);
    expect(verify.mock.calls[0][0]).toBe('abc');
    expect(verify.mock.calls[0][1]).toBe('jwt-pub');
    expect(verify.mock.calls[0][2]).toMatchObject({
      algorithms: ['RS256'],
    });
    expect(verify.mock.calls[0][3]).toBeDefined();

    verify.mock.calls[0][3](null, 'dwt');
  });

  test('Token verification errors', (done) => {
    const verification = Tokens.verifyToken('abc');

    verification
      .then(() => {
        throw new Error('Verification passed on failure.');
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('error error');
        done();
      });

    verify.mock.calls[0][3](new Error('error error'), null);
  });
});

import config from 'config';
import jwt from 'jsonwebtoken';

// @ts-ignore
const cert: string = config.get('jwt.cert').replace(/\\n/g, '\n');;
// @ts-ignore
const pubKey: string = config.get('jwt.pub').replace(/\\n/g, '\n');;

const options = {
  algorithm: 'RS256',
};

class Tokens {
  /**
   * Creates an auth token
   * @param user
   */
  public static generateToken(data: any, exp?: number): string {
    const args = Object.assign({}, data);

    if (exp) {
      args.exp = exp;
    }

    return jwt.sign(args, cert, options);
  }

  /**
   * Verifies an auth token
   * @param token
   */
  public static verifyToken(token: string): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      jwt.verify(token, pubKey, { algorithms: ['RS256'] }, (err: Error, decoded: any) => {
        err ? reject(err) : resolve(decoded);
      });
    });
  }
}

export default Tokens;

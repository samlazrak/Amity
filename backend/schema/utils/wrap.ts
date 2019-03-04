/**
 * wraps a chain of schema methods
 * runs a chain of promises that must each pass in order for the next to be called
 * allows authentication to be performed before api methods, etc.
 * @param {Function[]} chain
 */
export default (...chain: Function[]): Function => {
  return (async(_: any, query: any, context: any): Promise<any> => {
    let i = 0;
    let value: any;

    while (chain[i]) {
      try {
        value = await chain[i](query, context);
      } catch (e) {
        console.log(e);
        throw e;
      }

      i++;
    }

    if (value && value.toJSON) {
      return value.toJSON();
    }

    return value;
  });
}

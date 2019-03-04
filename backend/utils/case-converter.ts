import { snakeCase, camelCase } from 'lodash';

/**
 * Recursively transforms object keys for objects or arrays of objects
 * e.g. converting an object's keys from snake case to camel case
 * @param {any} val the object or array to transform
 * @param {Function} converter the function used to transform keys
 */
export const transform = (val: any, converter: Function): any => {
  if (typeof val !== 'object' || val == null) return val;

  // Value a list, need to map over all its values
  if (Array.isArray(val)) {
    return val.map(item => transform(item, converter));
  }

  return Object.keys(val).reduce((transformed: Object, key: string) => {
    return Object.assign(transformed, { [converter(key)]: transform(val[key], converter)});
  }, {});
};

/**
 * Transforms an object's keys to snake_case (recursively)
 * @param {any} val
 */
export const toSnakeCase = (val: any) => {
  return transform(val, snakeCase);
};

/**
 * Transforms an object's keys to camelCase (recursively)
 * @param val
 */
export const toCamelCase = (val: any) => {
  return transform(val, camelCase);
};

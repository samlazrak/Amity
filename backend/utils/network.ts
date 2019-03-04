/**
 * Fetches data in parallel, similar to Promise.all, but returns a keyed object instead of an array
 * @param data
 */
export const parallelFetch = async (data: any): Promise<any> => {
  const fetchedData = {};
  const keys = Object.keys(data);
  const promiseData = await Promise.all(keys.map((key) => {
    return data[key];
  }));

  promiseData.forEach((data, i) => {
    fetchedData[keys[i]] = data;
  });

  return fetchedData;
};

import { toSnakeCase, toCamelCase, transform } from '../case-converter';

describe('Case Converter', () => {

  const snakeCasedObject = {
    app_users: [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'jdoe@creaturebuilds.com',
      },
      [{ test_value: 12, }, 'test string']
    ],
    app_data: {
      app_name: 'Amity',
      version: '1.0',
    },
  };

  const camelCasedObject = {
    appUsers: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@creaturebuilds.com',
      },
      [{ testValue: 12, }, 'test string']
    ],
    appData: {
      appName: 'Amity',
      version: '1.0',
    },
  };

  test('Should convert nested object to snake case', () => {
    expect(toSnakeCase(camelCasedObject)).toMatchObject(snakeCasedObject);
  });

  test('Should convert nested object to camel case', () => {
    expect(toCamelCase(snakeCasedObject)).toMatchObject(camelCasedObject);
  });

  test('Transform should use custom function without mutating existing objects', () => {
    const converter = (a: string) => a.toUpperCase();

    const testInput = [{ 'pre fab': 12 }];
    const testOutput = transform(testInput, converter);

    expect(testInput[0]['pre fab']).toBe(12);
    expect(Object.keys(testInput)[0].length).toBe(1);

    expect(testOutput[0]['PRE FAB']).toBe(12);
    expect(Object.keys(testOutput)[0].length).toBe(1);
  });
});

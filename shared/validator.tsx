import validate from 'validator';

interface ValidatorResponse {
  success: boolean;
  data: any;
  errors: any;
  errorMessage: string;
};

/**
 * Used by Validator to validate a specific field on the form's data
 * Chainable methods allow multi-validation on fields
 */
class KeyValidator {
  private validator: Validator;
  private key: string;
  private value: string;
  private isValid: boolean;

  /**
   * @param {Validator} validator the parent validator
   * @param {string} key key of the field to use for errors
   * @param {string?} value the field to validate
   */
  constructor(validator: Validator, key: string, value: string) {
    this.validator = validator;
    this.key = key;
    this.value = value;
    this.isValid = true;
  }

  /**
   * Sets an error if the field is an empty string
   * @param {string} errorMessage the error message for the current validation check
   */
  public isRequired(errorMessage: string): this {
    if (this.value == '' || this.value === undefined) this.addError(errorMessage);
    return this;
  }

  public matches(value: string, errorMessage: string): this {
    if (this.value !== value) this.addError(errorMessage);
    return this;
  }

  /**
   * Runs validation on the field
   * @param {string} method the validation method to use
   * @param {string} errorMessage the error message for the validation check
   */
  public check(method: string, errorMessage: string): this {
    if (!this.isValid) return this;
    // @ts-ignore
    if (!validate[method](this.value)) this.addError(errorMessage);
    return this;
  }

  /**
   * Invalidates the form and sets an error message for the key/field
   * @param {string} errorMessage the error message for the current validation check
   */
  private addError(errorMessage: string): void {
    this.isValid = false;
    this.validator.addError(this.key, errorMessage);
  }
}

/**
 * Verifies form data
 */
class Validator {
  private data: any;
  private responseObject: any;
  private errors: any;
  private isValid: boolean;

  constructor(data: any) {
    this.data = Object.assign({}, data);
    this.isValid = true;
    this.responseObject = {};
    this.errors = {};
  }

  /**
   * Invalides the form and sets adds an error message for a key/field
   * @param {string} key the key of the field that failed validation
   * @param {string} errorMessage the error message for the current validation check
   */
  public addError(key: string, errorMessage: string): void {
    this.isValid = false;
    this.errors[key] = errorMessage;
  }

  /**
   * Starts validation on a particular field of the data object
   * @param {string} key the key of the field to validate
   */
  public verify(key: string): KeyValidator {
    this.responseObject[key] = this.data[key];
    return new KeyValidator(this, key, this.data[key]);
  }

  /**
   * Returns the current form state plus data and any errors
   */
  public validate(): ValidatorResponse {
    const errorMessage = Object.keys(this.errors).reduce((message: string, error: string) => {
      return message + `, ${error}`;
    }, '');

    return {
      errorMessage,
      success: this.isValid,
      data: this.responseObject,
      errors: this.errors,
    };
  }
}

export default Validator;

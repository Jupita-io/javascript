export default class InvalidParamException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidParameterException';
  }
}

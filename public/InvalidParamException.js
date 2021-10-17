class InvalidParamException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidParameterException';
  }
}

module.exports = InvalidParamException;

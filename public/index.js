const axios = require('axios');
const InvalidParamException = require('./InvalidParamException');

class Jupita {
  constructor(token, touchpointId) {
    if (!token) return new InvalidParamException('Token is required');
    if (!touchpointId)
      return new InvalidParamException('Touchpoint ID is required');

    this.token = token;
    this.touchpointId = touchpointId;
  }

  dump(text, inputId, channelType, messageType = 0, isCall = false, listener) {
    if (!text) return new InvalidParamException('Text is required');
    if (!inputId) return new InvalidParamException('Input ID is required');
    if (!channelType) return new InvalidParamException('Channel type is required');

    const data = {
      token: this.token,
      touchpoint_id: this.touchpointId,
      input_id: inputId,
      channel_type: channelType,
      message_type: messageType,
      text,
      isCall,
    };

    axios
      .post('https://api.jupita.io/v1/dump', data, {
        headers: { 'content-type': 'application/json' },
      })
      .then((res) => {
        listener?.onSuccess(res.data);
      })
      .catch((err) => {
        listener?.onError(err.response.status, err.response.data);
      });
  }
}

module.exports = { Jupita, MessageType: { Touchpoint: 0, Input: 1 } };

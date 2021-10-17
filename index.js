import axios from 'axios';
import InvalidParamException from './InvalidParamException';

export class Jupita {
  constructor(token, touchpointId) {
    if (!token) return new InvalidParamException('Token is required');
    if (!touchpointId)
      return new InvalidParamException('Touch Point ID is required');

    this.token = token;
    this.touchpointId = touchpointId;
  }

  dump(text, inputId, messageType = 0, isCall = false, listener) {
    if (!text) return new InvalidParamException('Text is required');
    if (!inputId) return new InvalidParamException('Input ID is required');

    const data = {
      token: this.token,
      touchpoint_id: this.touchpointId,
      input_id: inputId,
      message_type: messageType,
      text,
      isCall,
    };

    axios
      .post('https://api.jupita.io/v1/dump', data, {
        headers: { 'content-type': 'application/json' },
      })
      .then(res => {
        listener?.onSuccess(res.data);
      })
      .catch(err => {
        listener?.onError(err.response.status, err.response.data);
      });
  }
}

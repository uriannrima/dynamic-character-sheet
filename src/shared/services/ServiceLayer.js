import HttpService from 'shared/services/HttpService';
import SocketService from 'shared/services/SocketService';
import AuthService from 'shared/services/AuthService';

export class SocketLayer extends SocketService {
  constructor({ url }) {
    super({ serviceName: url.replace('/', '') });
  }

  async get(id) {
    const data = await this.service.get(id, {});
    return {
      data
    };
  }

  async getAll() {
    const data = await this.service.find({});
    return {
      data
    };
  }

  async saveOrUpdate(model) {
    const { _id } = model;
    var data = null
    if (_id) {
      data = await this.service.update(_id, model);
    } else {
      data = await this.service.create(model);
    }

    return {
      data
    };
  }

  async patch(_id, patch) {
    return await this.service.patch(_id, patch, {});
  }

  register(methodName, callback) {
    this.service.on(methodName, callback);
  }

  emit(methodName, payload) {
    this.feathers.io.emit('custom', methodName, this.serviceName, payload);
  }
}

export class HttpLayer extends HttpService {
  constructor({ url }) {
    super({ url });
  }

  async getHeaders() {
    var accessToken = await AuthService.getAuthentication();
    return {
      Authorization: accessToken
    };
  }

  async get(id) {
    try {
      var headers = await this.getHeaders();
      return await this.service.get(this.url + `/${id}`, { headers });
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      var headers = await this.getHeaders();
      return await this.service.get(this.url, { headers });
    } catch (error) {
      throw error;
    }
  }

  async saveOrUpdate(model) {
    try {
      var { _id } = model;
      var headers = await this.getHeaders();
      var serverCall = _id ? this.service.put : this.service.post;
      var url = this.url + (_id ? `/${_id}` : '');
      return await serverCall(url, model, { headers });
    } catch (error) {
      throw error;
    }
  }

  async patch(_id, patch) {
    try {
      var headers = await this.getHeaders();
      return await this.service.patch(this.url + `/${_id}`, patch, { headers });
    } catch (error) {
      throw error;
    }
  }

  register() {
    console.log("HttpLayer doesn't support registration.");
  }

  emit() {
    console.log("HttpLayer doesn't support emit.");
  }
}
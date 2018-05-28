import SocketAuth from './SocketAuth';
import HttpAuth from './HttpAuth';
import Cookies from 'js-cookie';

export class AuthService {
  public service: HttpAuth | SocketAuth;

  constructor(layer: string = '') {
    this.service = layer === 'HTTP' ? new HttpAuth() : new SocketAuth();
  }

  async refresh() {
    try {
      return await this.service.refresh();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(payload: any) {
    try {
      return await this.service.login(payload);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logout(accessToken?: string | null | undefined) {
    try {
      return await this.service.logout(accessToken);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAuthentication() {
    const userSession = Cookies.getJSON('userSession') as { accessToken: string };
    return userSession.accessToken;
  }
}

export default new AuthService();

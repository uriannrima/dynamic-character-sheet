import SocketAuth from './SocketAuth'
import HttpAuth from './HttpAuth'
import Cookies from 'js-cookie'
import { LoginPayload, RefreshPayload } from './login-payload'
import Constants from 'Constants';

export class AuthService {
  public service: HttpAuth | SocketAuth;

  constructor() {
    this.service = Constants.LAYER === 'HTTP' ? new HttpAuth() : new SocketAuth()
  }

  async refresh(payload: RefreshPayload) {
    try {
      return this.service.refresh(payload)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async login(payload: LoginPayload) {
    try {
      return this.service.login(payload)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async logout(accessToken?: string | null | undefined) {
    try {
      return this.service.logout(accessToken)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getAuthentication() {
    const userSession = Cookies.getJSON('userSession') as { accessToken: string }
    return userSession.accessToken
  }
}

export default new AuthService()

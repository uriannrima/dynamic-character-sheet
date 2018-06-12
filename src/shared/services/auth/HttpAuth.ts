import HttpLayer from '../layers/HttpLayer'
import { LoginPayload } from './login-payload'
import { UserSession } from './UserSession';

export default class HttpAuth extends HttpLayer {
  constructor() {
    super({
      url: '/authentication'
    })
  }

  async refresh() {
    try {
      var payload = { strategy: 'jwt' }
      var { data: { accessToken } } = await this.service.post(this.url, payload)
      return accessToken
    } catch (error) {
      throw error
    }
  }

  async login(payload: LoginPayload): Promise<UserSession> {
    try {
      payload.strategy = 'local'
      var { data } = await this.service.post<UserSession>(this.url, payload)
      return data
    } catch (error) {
      throw error
    }
  }

  async logout(accessToken?: string | null | undefined) {
    try {
      var headers = { Authorization: accessToken }
      this.service.delete(this.url, { headers })
      return true
    } catch (error) {
      throw error
    }
  }
}

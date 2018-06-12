import BaseSocketService from 'shared/services/bases/BaseSocketService'
import BaseHttpService from 'shared/services/bases/BaseHttpService'
import { IEntity } from '@/domain/interfaces/IEntity'
import Constants from 'Constants';

export default abstract class AbstractService<TModel extends IEntity> {
  public service: BaseSocketService<TModel> | BaseHttpService<TModel>;

  constructor({ url }: { url: string }) {
    this.service = Constants.LAYER === 'HTTP' ? new BaseHttpService({ url }) : new BaseSocketService<TModel>({ url })
  }

  async create(model?: any) {
    return model as TModel
  }

  async getById(_id: string, query: any = {}) {
    return this.service.get(_id, query)
  }

  async getAll(query = {}) {
    return this.service.find(query)
  }

  async saveOrUpdate(model: TModel) {
    const { _id } = model
    if (_id) {
      return this.service.update(model)
    } else {
      return this.service.create(model)
    }
  }

  async remove(_id: string) {
    return this.service.remove(_id)
  }

  async patch(_id: string, model: TModel) {
    return this.service.patch(_id, model)
  }
}

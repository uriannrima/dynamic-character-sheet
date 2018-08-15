import BaseSocketService from '@shared/services/bases/BaseSocketService'
import BaseHttpService from '@shared/services/bases/BaseHttpService'
import { IEntity } from '@domain/interfaces/IEntity'
import { IConstructor } from '@/services/MappingService';

export default abstract class AbstractService<TModel extends IEntity> {
  public service: BaseSocketService<TModel> | BaseHttpService<TModel>;

  constructor({ url, constructors }: { url: string, constructors?: Array<IConstructor<TModel>> }) {
    this.service = process.env.VUE_APP_LAYER === 'HTTP' ? new BaseHttpService({ url, constructors }) : new BaseSocketService<TModel>({ url, constructors })
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

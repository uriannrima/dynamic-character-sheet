import FeatModule from 'Modules/feat.module';
import AbstractService from './abstract.service';

class FeatService extends AbstractService {
    constructor() {
        super({
            model: FeatModule.Feat,
            url: '/feats'
        });
    }
}

export default new FeatService();

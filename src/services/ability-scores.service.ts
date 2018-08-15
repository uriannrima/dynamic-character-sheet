import { AbilityScore } from '@domain/ability-score';
import AbstractService from './abstract.service'

console.debug(AbilityScore);

class AbilityScoreService extends AbstractService<AbilityScore> {
  constructor() {
    super({ url: '/ability-scores', constructors: [AbilityScore] })
  }
}

export default new AbilityScoreService()

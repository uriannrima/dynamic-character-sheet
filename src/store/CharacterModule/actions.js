import Mappings from './mappings';
import CharacterService from 'services/character.service'
import ObjectUtils from 'utils/object.utils.js';
import NotificationService from 'services/NotificationService';

const toRegularForm = function (unregularString) {
  return unregularString
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })
};

export default {
  async connect(context, characterId) {
    // Ask for the server to connect to character channel.
    CharacterService.emit('character/connect', { characterId });

    // If the server send a patched, we update ourself
    CharacterService.register('patched', ({ mutation, delta }) => {
      const firstKey = Object.keys(delta)[0];
      const regular = toRegularForm(firstKey);
      NotificationService.notify({
        type: 'success',
        message: `Your sheet has been patched. => ${regular}: ${delta[firstKey]}.`
      })
      Store.commit(mutation.join('/'), delta);
    });
  },
  async [Mappings.Actions.loadCharacterAsync]({ commit }, characterId) {
    try {
      const character = await CharacterService.getData(characterId);

      commit(Mappings.Mutations.updateId, character._id);
      commit(Mappings.Mutations.updateDescription, ObjectUtils.extractFrom(character, [
        'name', 'playerName', 'race',
        'alignment', 'deity', 'age',
        'gender', 'height', 'weight',
        'eyes', 'hair', 'skin'
      ]));
      commit(Mappings.Mutations.updateClasses, character.classes);
      commit(Mappings.Mutations.updateSize, character.size);
      commit(Mappings.Mutations.updateAbilityScores, character.abilityScores);
      commit(Mappings.Mutations.updateStatus, character.status);
      commit(Mappings.Mutations.updateSpeed, character.speed);
      commit(Mappings.Mutations.updateGear, character.gear);
      commit(Mappings.Mutations.updateArmorClass, character.armorClass);
      commit(Mappings.Mutations.updateDamageReduction, character.damageReduction);
    } catch (error) {
      console.log(error);
    }
  },
  async [Mappings.Actions.updateDescriptionAsync]({ commit, state }, description) {

    CharacterService.patch(state._id, {
      mutation: ['CharacterModule', Mappings.Mutations.updateDescription],
      payload: description
    });

    commit(Mappings.Mutations.updateDescription, description);
  }
}

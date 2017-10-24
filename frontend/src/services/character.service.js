import axios from 'axios';
import Constants from 'Constants';
import CharacterModule from 'Modules/character.module';

async function foo() {
    console.log('Aqui...');
    return 1;
}

async function bar() {
    var x = await foo();
    console.log(x)
}

bar().then(() => {
    console.log('Foi...');
});

export default {
    charactersOffline: {

    },
    new: function () {
        return new CharacterModule.Character({});
    },
    load: function (characterData) {
        return new CharacterModule.Character(characterData);
    },
    getAll: function (id) {
        return axios.get(Constants.API_URL + '/characters/').then(response => {
            return response.data.map(characterData => {
                return new CharacterModule.Character(characterData);
            });
        });
    },
    get: function (id) {
        return axios.get(Constants.API_URL + '/characters/' + id).then(response => {
            return new CharacterModule.Character(response.data);
        });
    },
    saveOrUpdate: function (character) {
        if (character._id) {
            return axios.put(Constants.API_URL + '/characters', { character }).then(response => {
                return response.data;
            });
        } else {
            return axios.post(Constants.API_URL + '/characters', { character }).then(response => {
                return response.data;
            });
        }
    },
    resetSkills: function (character) {
        return axios.put(Constants.API_URL + '/characters/skill/reset', { character }).then(response => {
            return response.data;
        });
    },
    update: function (character) {
        // Be updated by char ability score.
        for (var index = 0; index < character.abilityScores.length; index++) {
            var abilityScore = character.abilityScores[index];
            abilityScore.update(character);
        }

        character.grapple.baseAttackBonus = character.baseAttackBonus;
    },
    addFeat: function (character, feat) {
        return axios.post(Constants.API_URL + '/characters/feat', { character, feat }).then(response => {
            return response.data;
        });
    },
    removeFeat: function (character, featId) {
        return axios.put(Constants.API_URL + '/characters/feat/' + featId, { character }).then(response => {
            return response.data;
        });
    }
}

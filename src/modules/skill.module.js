import SubValue from './sub-value.module';

export class CharacterSkill {
  constructor({ _id, name = "", keyScoreName = "", untrained = true,
    armorCheckPenalty = false, classSkill = false, hasSubValue = false,
    subValues = [], rank = 0, abilityModifier = 0, miscModifier = 0, hiddenModifier = 0 }) {

    Object.assign(this, {
      _id, name, keyScoreName, untrained, armorCheckPenalty,
      classSkill, hasSubValue, subValues, rank,
      abilityModifier, miscModifier, hiddenModifier
    });

    if (hasSubValue || subValues.length >= 1) {
      if (subValues.length >= 1) {
        this.subValues = subValues;
      } else {
        this.subValues = [];
        this.subValues.push(new SubValue());
      }
    }
  }
}

export class Skill {
  constructor({
    _id,
    name = "",
    keyScoreName = "",
    untrained = true,
    armorCheckPenalty = false,
    classSkill = false,
    check = "",
    action = "",
    tryAgain = "",
    special = "",
    synergy = "",
    untrainedDescription = "",
    restriction = "",
    miscellaneous = "",
    aditionalInformation = "",
    hasSubValue = false,
    subValues = [],
    rank = 0,
    abilityModifier = 0,
    miscModifier = 0,
    hiddenModifier = 0 }) {

    Object.assign(this, {
      _id,
      name,
      keyScoreName,
      untrained,
      armorCheckPenalty,
      classSkill,
      check,
      action,
      tryAgain,
      special,
      synergy,
      untrainedDescription,
      restriction,
      miscellaneous,
      aditionalInformation,
      hasSubValue,
      subValues,
      rank,
      abilityModifier,
      miscModifier,
      hiddenModifier
    });

    this.toCharacterSkill = function () {
      return new CharacterSkill(this);
    };
  }
};

export const All = [
  new Skill({ name: 'Appraise', keyScoreName: 'intelligence', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Balance', keyScoreName: 'dexterity', untrained: true, armorCheckPenalty: true }),
  new Skill({ name: 'Bluff', keyScoreName: 'charisma', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Climb', keyScoreName: 'strength', untrained: true, armorCheckPenalty: true }),
  new Skill({ name: 'Concentration', keyScoreName: 'constitution', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Craft', keyScoreName: 'intelligence', untrained: true, armorCheckPenalty: true }),
  new Skill({ name: 'Decipher Script', keyScoreName: 'intelligence', untrained: false, armorCheckPenalty: false }),
  new Skill({ name: 'Diplomacy', keyScoreName: 'charisma', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Disable Device', keyScoreName: 'intelligence', untrained: false, armorCheckPenalty: false }),
  new Skill({ name: 'Disguise', keyScoreName: 'charisma', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Escape Artist', keyScoreName: 'dexterity', untrained: true, armorCheckPenalty: true }),
  new Skill({ name: 'Forgery', keyScoreName: 'intelligence', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Gather Information', keyScoreName: 'charisma', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Handle Animal', keyScoreName: 'charisma', untrained: false, armorCheckPenalty: false }),
  new Skill({ name: 'Heal', keyScoreName: 'wisdom', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Hide', keyScoreName: 'dexterity', untrained: true, armorCheckPenalty: true }),
  new Skill({ name: 'Intimidate', keyScoreName: 'charisma', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Jump', keyScoreName: 'strength', untrained: true, armorCheckPenalty: true }),
  new Skill({ name: 'Knowledge', keyScoreName: 'intelligence', untrained: false, armorCheckPenalty: false, hasSubValue: true }),
  new Skill({ name: 'Listen', keyScoreName: 'wisdom', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Move Silently', keyScoreName: 'dexterity', untrained: true, armorCheckPenalty: true }),
  new Skill({ name: 'Open Lock', keyScoreName: 'dexterity', untrained: false, armorCheckPenalty: false }),
  new Skill({ name: 'Perform', keyScoreName: 'charisma', untrained: false, armorCheckPenalty: false, hasSubValue: true }),
  new Skill({ name: 'Profession', keyScoreName: 'wisdom', untrained: false, armorCheckPenalty: false, hasSubValue: true }),
  new Skill({ name: 'Ride', keyScoreName: 'dexterity', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Search', keyScoreName: 'intelligence', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Sense Motive', keyScoreName: 'wisdom', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Sleight of Hands', keyScoreName: 'dexterity', untrained: false, armorCheckPenalty: true }),
  new Skill({ name: 'Spellcraft', keyScoreName: 'intelligence', untrained: false, armorCheckPenalty: false }),
  new Skill({ name: 'Spot', keyScoreName: 'wisdom', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Survival', keyScoreName: 'wisdom', untrained: true, armorCheckPenalty: false }),
  new Skill({ name: 'Swim', keyScoreName: 'strength', untrained: true, armorCheckPenalty: true }),
  new Skill({ name: 'Tumble', keyScoreName: 'dexterity', untrained: false, armorCheckPenalty: true }),
  new Skill({ name: 'Use Magic Device', keyScoreName: 'charisma', untrained: false, armorCheckPenalty: false }),
  new Skill({ name: 'Use Rope', keyScoreName: 'dexterity', untrained: true, armorCheckPenalty: false })
];

export default Skill;
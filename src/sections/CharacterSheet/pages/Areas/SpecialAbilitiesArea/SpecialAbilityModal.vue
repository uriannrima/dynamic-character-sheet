<template>
  <dcs-modal :show="show"
             :onClose="close">
    <div slot="header">
      <div class="black-box">
        <label>Special Abilities</label>
      </div>
    </div>
    <div slot="body">
      <div class="select-special-ability-container"
           v-if="!editing && !describe">
        <span>Select special ability:</span>
        <select v-model="selected">
          <option value="">New special ability</option>
          <option v-for="(specialAbility, index) in all"
                  :value="specialAbility"
                  :key="index">{{specialAbility.name}}
          </option>
        </select>
      </div>
      <special-ability-form :model="model"
                            :describe="selected || describe"></special-ability-form>
      <div v-show="vErrors.any()">
        <ul>
          <li v-for="(error,index) in vErrors.all()"
              :key="index">{{error}}</li>
        </ul>
      </div>
    </div>
    <div slot="footer">
      <div v-show="isDuplicated">
        <span style="color: red; font-weight: bold;">Character already has this special ability.</span>
      </div>
      <button @click="save()"
              v-show="editing">Save</button>
      <button @click="cancelEdit()"
              v-show="editing">Cancel</button>
      <button @click="add()"
              v-show="!describe && !editing">Add</button>
      <button @click="edit()"
              v-show="describe || selected">Edit</button>
      <button @click="remove()"
              v-show="describe">Remove</button>
    </div>
  </dcs-modal>
</template>

<script>
import SpecialAbilityService from 'services/special-ability.service';
import { SpecialAbilityForm } from './';
import { ModalMixin } from 'shared/modal';

export default {
  components: { SpecialAbilityForm },
  mixins: [ModalMixin],
  created: function () {
    this.service = SpecialAbilityService;
    this.modelName = 'specialAbility';
  }
}
</script>

<style>

</style>
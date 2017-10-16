import axios from 'axios';
import spellSchoolModule from 'Modules/spell-school.module';
import Constants from 'Constants';
import guid from 'Utils/guid';

export default {
    spellSchoolsOffline: {

    },
    new: function () {
        return new spellSchoolModule.spellSchool({});
    },
    toCharacterSpecialAbility: function(spellSchool){
        // Change it to become a character spell scholl.
        spellSchool._id = guid.generate();
        return new spellSchoolModule.spellSchool(spellSchool);
    },
    getAll: function () {
        return axios.get(Constants.API_URL + '/spellSchools').then(response => {
            return response.data;
        });
    },
    saveOrUpdate: function (spellSchool) {
        if (spellSchool._id) {
            return axios.put(Constants.API_URL + '/spellSchools', { spellSchool }).then(response => {
                return response.data;
            }, reason => {
                return this.spellSchoolsOffline[spellSchool._id] = spellSchool;
            });
        } else {
            return axios.post(Constants.API_URL + '/spellSchools', { spellSchool }).then(response => {
                return response.data;
            }, reason => {
                spellSchool._id = generateGuid();
                return this.spellSchoolsOffline[spellSchool._id] = spellSchool;
            });
        }
    }
}
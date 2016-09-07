import BaseValidator from 'ember-cp-validations/validators/base';

const UsernameExists = BaseValidator.extend({
  ajax: Ember.inject.service(),
  validate(value, options, model, attribute) {
    return this.get('ajax').request('v2/profile/check/' + value).then((res) => {
      if(!res.available){
        return "Username already exists";
      }else{
        return true;
      }
    });
  }
});

UsernameExists.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default UsernameExists;

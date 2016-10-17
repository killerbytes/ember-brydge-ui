import BaseValidator from 'ember-cp-validations/validators/base';

const StartFrom = BaseValidator.extend({
  ajax: Ember.inject.service(),
  validate(value, options, model, attribute) {
    return moment(value).isBefore(model.get('endAt')) ? true : 'Invalid start date';
  }
});

StartFrom.reopenClass({
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

export default StartFrom;

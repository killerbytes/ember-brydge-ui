import BaseValidator from 'ember-cp-validations/validators/base';

const EndAt = BaseValidator.extend({
  ajax: Ember.inject.service(),
  validate(value, options, model, attribute) {
    return moment(value).isAfter(model.get('startFrom')) ? true : 'Invalid end date';
  }
});

EndAt.reopenClass({
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

export default EndAt;

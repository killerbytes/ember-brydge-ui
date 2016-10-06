import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  invites: Ember.computed.filterBy('model', 'isNew', false),
  remaining: Ember.computed('invites.length', function(){
    return _.map(_.range(10 -this.get('invites.length')), function () { return undefined; });
  })
});

import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: 'tab_1',
  profile: Ember.computed.alias('model.profile'),
  listxxx: Ember.computed.alias('model.list'),
  mutualxxxx: Ember.computed.alias('model.mutual'),
  connections: Ember.computed('model.list.@each', 'key', function(){
    let query = this.get('key');
    if(!query) return this.get('model.list').filterBy('status','accepted');
    var fields = ['firstName', 'lastName'];
    return this.get('model.list').filter(function(item){
      var found = false;
      _.forEach(fields, function(key) {
        found = item.get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;
    })
  }),

});

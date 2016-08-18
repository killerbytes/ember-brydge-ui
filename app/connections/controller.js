import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: 'tab_1',
  profile: Ember.computed.alias('model.profile'),
  list: Ember.computed.alias('model.list'),
  accepted: Ember.computed.filterBy('model.mutual', 'status', 'accepted'),
  mutual: Ember.computed.filterBy('accepted', 'friend.status', 'accepted'),
  mutual_connections: Ember.computed('mutual', 'key', function(){
    let query = this.get('key');
    if(!query) return this.get('mutual');
    var fields = ['firstName', 'lastName'];
    return this.get('mutual').filter(function(item){
      var found = false;
      _.forEach(fields, function(key) {
        found = item.get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;
    })
  }),
  connections: Ember.computed('model.list', 'key', function(){
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

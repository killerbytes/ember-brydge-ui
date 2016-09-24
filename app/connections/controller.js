import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: 'tab_1',
  profile: Ember.computed.alias('model.profile'),
  meta: Ember.computed('model.list', function(){
    return this.get('model.list.meta');
  }),
  list: Ember.computed.alias('model.list'),
  mutual: Ember.computed.alias('model.mutual'),
  mutual_connections: Ember.computed('mutual.@each.friend', 'key', 'isMutual', function(){
    var fields = ['fullName'];
	  var query = this.get('key');
    if(!query) return this.get('mutual')
    .filter(item=>{
      return item.get('friend.status') == 'accepted';
    })
    return this.get('mutual')
    .filter(item=>{
      // return item.get('friend.status') == 'accepted';
      var user = this._getUser(item);
      var found = false;
      _.forEach(fields, function(key) {
        found = user.get(`profile.${key}`).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;      
    })
  }),
  connections: Ember.computed('list.@each.status', 'key', function(){
	  var fields = ['fullName'];
	  var query = this.get('key');
    if(!query) return this.get('list').filterBy('status', 'accepted');
		return this.get('list')
		.filter(item=>{
			var user = this._getUser(item);
      var found = false;
      _.forEach(fields, function(key) {
        found = user.get(`profile.${key}`).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;
		})
	}),
  _getUser(item){
		return this.get('meta.requestid') == item.get('userid.id') ? item.get('friendid') : item.get('userid');
	},
});

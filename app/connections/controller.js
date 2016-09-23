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

  // list: Ember.computed.filterBy('model.list', 'status', 'accepted'),
  // mutual: Ember.computed.filterBy('accepted', 'friend.status', 'accepted'),
  // mutual_connections: Ember.computed('mutual', 'key', function(){
  //   let query = this.get('key');
  //   if(!query) return this.get('mutual');
  //   var fields = ['firstName', 'lastName'];
  //   return this.get('mutual').filter(function(item){
  //     var found = false;
  //     _.forEach(fields, function(key) {
  //       found = item.get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
  //       if(found) return false;
  //     })
  //     return found;
  //   })
  // }),
  mutual_connections: Ember.computed('mutual.@each.friend', 'key', 'isMutual', function(){
    var fields = ['firstName', 'lastName'];
	  var query = this.get('key');
    // if(!query) return this.get('mutual');
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
  // mutual_connectionsxx: Ember.computed('mutual.@each.friend.status', 'key', function(){
	//   var fields = ['firstName', 'lastName'];
	//   var query = this.get('key');
  //   if(!query) return this.get('mutual').filter(item=>{
  //     console.log(item.get('friend.status'))
  //   });
	// 	return this.get('mutual').filterBy('status', 'accepted')
	// 	.filter(item=>{
	// 		var user = this._getUser(item);
  //     var found = false;
  //     _.forEach(fields, function(key) {
  //       found = user.get(`profile.${key}`).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
  //       if(found) return false;
  //     })
  //     return found;
	// 	})
	// }),
  //
  connections: Ember.computed('list.@each.status', 'key', function(){
	  var fields = ['firstName', 'lastName'];
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
  // actions: {
  //   mutual(){
  //     console.log('mutual')
  //   }
  // }

  // connections: Ember.computed('model.list', 'key', function(){
  //   let query = this.get('key');
  //   if(!query) return this.get('model.list').filterBy('status','accepted');
  //   var fields = ['firstName', 'lastName'];
  //   return this.get('model.list').filter(function(item){
  //     var found = false;
  //     _.forEach(fields, function(key) {
  //       found = item.get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
  //       if(found) return false;
  //     })
  //     return found;
  //   })
  // }),

});

import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
	// selectedAccept: null,
	// selectedReject: null,
  // queryParams: ['targetid'],
  // targetid: null,
	meta: Ember.computed('model', function(){
		return this.get('model.meta');
	}),
	// user: Ember.computed('item', 'item.userid.profile.connection.status', 'item.friendid.profile.connection.status', function(){
	// 	var userid = this.get('meta.requestid');
	// 	return userid == this.get('item.userid.id') ? this.get('item.friendid') : this.get('item.userid');
	// }),
	following: Ember.computed.alias('model'),
	connections: Ember.computed('model.@each.status', 'key', function(){
	  var fields = ['firstName', 'lastName'];
	  var query = this.get('key');
    if(!query) return this.get('model').filterBy('status', 'accepted');
		return this.get('model').filterBy('status', 'accepted')
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
  // acceptedList: Ember.computed('model.@each.status', 'key', function(){
  //   let query = this.get('key');
  //   if(!query) return this.get('model').filterBy('status','accepted');
  //   var fields = ['firstName', 'lastName'];
	//
  //   return this.get('model').filterBy('status','accepted').filter(function(item){
  //     var found = false;
  //     _.forEach(fields, function(key) {
  //       found = item.get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
  //       if(found) return false;
  //     })
  //     return found;
  //   })
  // }),
  // pendingList: Ember.computed('model.@each.status', function(){
  //   return this.get('model').filterBy('status','pending');;
  // }),
  // pendingListTop: Ember.computed('model.@each.status', function(){
  //   return this.get('pendingList').splice(0,1);
  // }),
  actions: {
    select(item){
      this.set('selected', item);
    }
  }
});

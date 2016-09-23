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
	connections: Ember.computed('model.@each.status', 'key', function(){
	  var fields = ['firstName', 'lastName'];

		return this.get('model').filterBy('status', 'accepted');
		//.filter(function(item){
		// 	console.log(item.get(''))
    //   var found = false;
    //   _.forEach(fields, function(key) {
		// 		console.log(item.get(key))
    //     // found = item.get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
    //     if(found) return false;
    //   })
    //   return found;
		// })
	}),
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

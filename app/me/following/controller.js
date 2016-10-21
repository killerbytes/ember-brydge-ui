import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
	following: Ember.computed.alias('model'),
	list: Ember.computed('following.@each.user', 'key', function(){
	  var fields = ['fullName'];
	  var query = this.get('key');
    if(!query) return this.get('following');
		return this.get('following')
		.filter(function(item){
      var found = false;
      _.forEach(fields, function(key) {
        found = item.get(`user.profile.${key}`).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;
		})
	}),
  actions: {
    select(item){
      this.set('selected', item);
    },
  }
});

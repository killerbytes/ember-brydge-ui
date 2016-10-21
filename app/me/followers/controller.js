import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
	follower: Ember.computed.alias('model'),
	list: Ember.computed('follower.@each', 'key', function(){
	  var fields = ['fullName'];
	  var query = this.get('key');
    if(!query) return this.get('follower');
		return this.get('follower')
		.filter(function(item){
      var found = false;
      _.forEach(fields, function(key) {
        found = item.get(`user.profile.${key}`).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;
		})
	})
});

import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
	followers: Ember.computed.alias('model.followers'),
	listKey: Ember.computed.alias('followers'),
  list: Ember.computed('listKey.@each', 'key', function(){
	  var fields = ['fullName'];
	  var query = this.get('key');
    if(!query) return this.get('listKey');
		return this.get('listKey')
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

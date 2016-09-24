import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
	_getUser(item){
		return this.get('meta.requestid') == item.get('userid.id') ? item.get('friendid') : item.get('userid');
	},
	meta: Ember.computed('model', function(){
    return this.get('model.meta');
  }),
	connections: Ember.computed('model.@each.status', 'key', function(){
		var fields = ['fullName'];
		var query = this.get('key');
    if(!query) return this.get('model').filterBy('status','accepted');
    return this.get('model').filterBy('status','accepted')
		.filter(item=>{
			var user = this._getUser(item);
      var found = false;
      _.forEach(fields, function(key) {
				found = user.get(`profile.${key}`).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;
    })
  })
});

import Ember from 'ember';

export default Ember.Controller.extend({
	connections: Ember.computed('model.@each.status', 'key', function(){
    let query = this.get('key');
    if(!query) return this.get('model').filterBy('status','accepted');
    var fields = ['firstName', 'lastName'];

    return this.get('model').filterBy('status','accepted').filter(function(item){
      var found = false;
      _.forEach(fields, function(key) {
        found = item.get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;
    })
  })
});

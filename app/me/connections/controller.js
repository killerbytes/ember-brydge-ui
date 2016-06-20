import Ember from 'ember';

export default Ember.Controller.extend({
	selectedAccept: null,
	selectedReject: null,
  queryParams: ['targetid'],
  targetid: null,
  userAvatar: Ember.computed('connection.from.profile.avatarUrl', function(){
    return Ember.String.htmlSafe("background-image: url(" + this.get('connection.from.profile.avatarUrl') + ')' );
  }),
  acceptedList: Ember.computed('model.@each.status', 'key', function(){
    let query = this.get('key');
    if(!query) return this.get('model').filterBy('status','accepted');
    var fields = ["name"];
    return this.get('model').filterBy('status','accepted').filter(function(item){
      var found = false;
      _.forEach(fields, function(key) {
        found = item.get('from').get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
        if(found) return false;
      })
      return found;
    })
  }),
  pendingList: Ember.computed('model.@each.status', function(){
    return this.get('model').filterBy('status','pending');;
  }),
  pendingListTop: Ember.computed('model.@each.status', function(){
    return this.get('pendingList').splice(0,1);
  }),
  actions: {
    select(item){
      this.set('selected', item);
    }
  }
});

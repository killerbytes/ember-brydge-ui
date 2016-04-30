import Ember from 'ember';

export default Ember.Controller.extend({
  connected: Ember.computed('model.connectionStatus.status', function(value){
    return this.get('model.connectionStatus.status') == 'accept' ? true : false;
  }),

  flagCompliment: Ember.computed('complimentContent', function(){
  	return Ember.isEmpty(this.get('complimentContent'));
  }),

  complimentContent: '',

  titles: ['Thank you for','Good job on','Congratulations on','Kudos on'],

  complimentTitle: 'Thank you for'
});

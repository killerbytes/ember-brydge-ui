import Ember from 'ember';
import CheckCurrentUserMixin from 'web/mixins/check-current-user';

export default Ember.Controller.extend(CheckCurrentUserMixin,{
  isConnected: Ember.computed('model.connection.status', function(value){
    return this.get('model.connection.status') == 'accept' ? true : false;
  }),

  latestQuestion: Ember.computed('questions', function(){
  	return this.get('questions.firstObject');
  }),

  flagCompliment: Ember.computed('complimentContent', function(){
  	return Ember.isEmpty(this.get('complimentContent'));
  }),

  latestCompliment: Ember.computed('compliments', function () {
    return this.get('compliments.firstObject');
  }),

  complimentContent: '',

  titles: ['Thank you for','Good job on','Congratulations on','Kudos on'],

  complimentTitle: 'Thank you for'
});

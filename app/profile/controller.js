import Ember from 'ember';
import CheckCurrentUserMixin from 'web/mixins/check-current-user';

export default Ember.Controller.extend(CheckCurrentUserMixin,{
  connected: Ember.computed('model.connectionStatus.status', function(value){
    return this.get('model.connectionStatus.status') == 'accept' ? true : false;
  }),
  latestQuestion: Ember.computed('model.questions', function(){
  	return this.get('model.questions.firstObject');
  }),

  flagCompliment: Ember.computed('complimentContent', function(){
  	return Ember.isEmpty(this.get('complimentContent'));
  }),

  latestCompliment: Ember.computed('model.compliments', function () {
    return this.get('model.compliments.firstObject');
  }),

  complimentContent: '',

  titles: ['Thank you for','Good job on','Congratulations on','Kudos on'],

  complimentTitle: 'Thank you for'
});

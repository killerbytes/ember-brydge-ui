import Ember from 'ember';
import CheckCurrentUserMixin from 'web/mixins/check-current-user';

export default Ember.Controller.extend(CheckCurrentUserMixin,{
  isConnected: Ember.computed('model.connection.status', function(){
    return this.get('model.connection.status') == 'accept' ? true : false;
  }),
  connectionStatus: Ember.computed('model.connection.status', function(){
    return this.get('model.connection.status') == 'pending' ? 'Pending' : 'Connect';
  }),
  activeConnections: Ember.computed.filterBy('connections', 'status', 'accept'),

  latestQuestion: Ember.computed('questions', function(){
  	return this.get('questions.firstObject');
  }),

  flagCompliment: Ember.computed('complimentContent', function(){
  	return Ember.isEmpty(this.get('complimentContent'));
  }),

  acceptedCompliments: Ember.computed.filterBy('compliments', 'status', 'accept'),
  latestCompliment: Ember.computed('acceptedCompliments', function(){
    return this.get('acceptedCompliments.firstObject');
  }),

  complimentContent: '',

  titles: ['Thank you for','Good job on','Congratulations on','Kudos on'],

  complimentTitle: 'Thank you for'
});

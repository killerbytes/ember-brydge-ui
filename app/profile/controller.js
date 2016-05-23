import Ember from 'ember';
import CheckCurrentUserMixin from 'web/mixins/check-current-user';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';

export default Ember.Controller.extend(
  CheckCurrentUserMixin, 
  ComplimentTitlesMixin, {
  isConnected: Ember.computed('model.connection.status', function(){
    return this.get('model.connection.status') == 'accepted' ? true : false;
  }),
  connectionStatus: Ember.computed('model.connection.status', function(){
    return this.get('model.connection.status') == 'pending' ? 'Pending' : 'Connect';
  }),
  activeConnections: Ember.computed.filterBy('connections', 'status', 'accepted'),

  latestQuestion: Ember.computed('questions', function(){
  	return this.get('questions.firstObject');
  }),

  flagCompliment: Ember.computed('complimentContent', function(){
  	return Ember.isEmpty(this.get('complimentContent'));
  }),

  acceptedCompliments: Ember.computed.filterBy('compliments', 'status', 'accepted'),
  latestCompliment: Ember.computed('acceptedCompliments', function(){
    return this.get('acceptedCompliments.firstObject');
  }),
  location: Ember.computed('model.location', function(){
    if(!this.get('model.location')) return false;
    var location = this.get('model.location').split(',');
    return {
      city: location.splice(0, 1),
      state: location.join(', ')
    }
  }),

  complimentContent: '',

  // titles: ['Thank you for','Good job on','Congratulations on','Kudos on'],

  complimentTitle: 'Thank you for'
});

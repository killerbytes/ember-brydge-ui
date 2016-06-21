import Ember from 'ember';
import CheckCurrentUserMixin from 'web/mixins/check-current-user';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';

export default Ember.Controller.extend(
  ComplimentTitlesMixin, {
  sharePost: Ember.inject.service(),

  me: Ember.computed.alias('model.me'), 
  profile: Ember.computed.alias('model.profile'), 
  connections: Ember.computed.alias('model.connections'), 
  languages: Ember.computed.alias('model.languages'), 
  experiences: Ember.computed.alias('model.experiences'), 
  educations: Ember.computed.alias('model.educations'), 
  interests: Ember.computed.alias('model.interests'), 
  questions: Ember.computed.alias('model.questions'), 
  posts: Ember.computed.alias('model.posts'), 
  compliments: Ember.computed.alias('model.compliments'), 

  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted' ? true : false;
  }),
  isNotEmptyTitleCompany: Ember.computed('profile.currentTitle', 'profile.currentCompany', function(){
    return this.get('profile.currentTitle') ? true : false && this.get('profile.currentCompany') ? true : false;
  }),
  isNotEmptyOccupation: Ember.computed('profile.occupationOne', 'profile.OccupationTwo', function(){
    return this.get('profile.occupationOne') ? true : false && this.get('profile.OccupationTwo') ? true : false;
  }),
  connectionStatus: Ember.computed('isConnected', function(){
    return this.get('isConnected') ? true : this.get('profile.connection.status') == 'pending' ? 'Pending' : 'Connect';
  }),
  activeConnections: Ember.computed.filterBy('connections', 'status', 'accepted'),

  latestQuestion: Ember.computed('questions', function(){
  	return this.get('questions.firstObject');
  }),

  flagCompliment: Ember.computed('complimentContent', function(){
  	return Ember.isEmpty(this.get('complimentContent'));
  }),
  sortFrom: ['from:desc'],
  academia: Ember.computed.sort('educations', 'sortFrom'),
  work: Ember.computed.sort('experiences', 'sortFrom'),
  workHistory: Ember.computed('work', function(){
    var work = this.get('work').toArray()
    return _.sortBy(work, 'currentCompany', function(i){
      return !i.get('currentCompany');
    });
  }),

  acceptedCompliments: Ember.computed.filterBy('compliments', 'status', 'accepted'),
  latestCompliment: Ember.computed('acceptedCompliments', function(){
    return this.get('acceptedCompliments.firstObject');
  }),
  location: Ember.computed('profile.location', function(){
    if(!this.get('profile.location')) return false;
    var location = this.get('profile.location').split(',');
    return {
      city: location.splice(0, 1),
      state: location.join(', ')
    }
  }),

  complimentContent: '',

  // titles: ['Thank you for','Good job on','Congratulations on','Kudos on'],

  complimentTitle: 'Thank you for'
});

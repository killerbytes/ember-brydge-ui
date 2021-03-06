import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';
import ProfileMixin from 'web/mixins/profile';
import IndustryMixin from 'web/mixins/industry';

export default Ember.Controller.extend(
  IndustryMixin,
  ComplimentTitlesMixin,
  ProfileMixin, {
  sharePost: Ember.inject.service(),
  me: Ember.computed.alias('model.me'),
  // profile: Ember.computed.alias('model.profile'),
  // languages: Ember.computed.alias('model.languages'),
  // experiences: Ember.computed.alias('model.experiences'),
  // educations: Ember.computed.alias('model.educations'),
  // interests: Ember.computed.alias('model.interests'),
  // questions: Ember.computed.alias('model.questions'),
  // posts: Ember.computed.alias('model.posts'),
  // compliments: Ember.computed.alias('model.compliments'),
  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted' ? true : false;
  }),
  isNotEmptyTitleCompany: Ember.computed('profile.currentTitle', 'profile.currentCompany', function(){
    return this.get('profile.currentTitle') ? true : false && this.get('profile.currentCompany') ? true : false;
  }),
  isNotEmptyOccupation: Ember.computed('profile.industryTwoName', 'profile.industryThreeName', function(){
    return this.get('profile.industryTwoName') ? true : false && this.get('profile.industryThreeName') ? true : false;
  }),
  connectionStatus: Ember.computed('isConnected', function(){
    return this.get('isConnected') ? true : this.get('profile.connection.status') == 'pending' ? 'Pending' : 'Connect';
  }),

  latestQuestion: Ember.computed('questions', function(){
  	return this.get('questions.firstObject');
  }),

  flagCompliment: Ember.computed('complimentContent', function(){
  	return Ember.isEmpty(this.get('complimentContent'));
  }),
  sortFrom: ['from:desc'],

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

  complimentTitle: 'Thank you for',
  actions: {
    share(data, cb){
      this.set('sharePost.valueText', data.content );
			this.set('sharePost.categories', data.categories );
      this.get('sharePost').submit().then((res)=>{
        cb.apply();
      });
    },

  }
});

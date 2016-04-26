import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sessionAccount: Ember.inject.service('session-account'),
	selected: Ember.computed('post', function() {
    return this.get('post');
  }),
  selectPost(post){
    this.set('post', post);
  },


});


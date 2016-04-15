import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  
  loggedinUser: null,
  paramsUserProfile: null,

  beforeModel: function(transition) {
    const loggedinUser = this.get('session.data.authenticated');
    this.set('loggedinUser', loggedinUser);
    
    if (loggedinUser.username === transition.params['profile'].username) {
      this.transitionTo('me');
      return;
    }
  },

  model: function(params) {
    console.log(params)
    return this.store.findRecord('public-profile', params.username).then((p)=>{
      this.set('paramsUserProfile',p);
    });
  },

  afterModel: function() {
    var userid = this.get('paramsUserProfile').get('userid');
    var ownerid = this.get('loggedinUser').user_id;

    console.log('userids =>', userid, ownerid);
    var self = this;

    return Ember.RSVP.hash({
      accountProfile: this.store.findRecord('profile', ownerid),
      experiences: this.store.query('experience',{userid: userid}),
      educations: this.store.query('education',{userid: userid}),
      questions: this.store.query('ask',{userid: userid}).then(function(asks){
         return asks.filterBy('answer');
      }),
      trendingPosts: this.store.query('post', {userid: userid})
    }).then((result)=>{
      self.set('accountProfile', result.accountProfile);
      self.set('experiences', result.experiences);
      self.set('educations', result.educations);
      self.set('trendingPosts', result.trendingPosts);
      self.set('lastestQuestion', result.questions.get('firstObject'));
    });
  },

  setupController: function(controller, model) {
    var avatar = this.get('accountProfile').get('avatarUrl');

    controller.set('model',{
      profile: this.get('paramsUserProfile'),
      avatar: avatar,
      loggedinUser: this.get('loggedinUser'),
      educations: this.get('educations'),
      experiences: this.get('experiences'),
      trendingPosts: this.get('trendingPosts'),
      lastestQuestion: this.get('lastestQuestion')
    });
  },

  actions: {
    clickedConnect: function (callback) {
      console.log('component clicked');

      var _this = this;

      var connection = this.store.createRecord('connection');

      let target = this.store.peekRecord('user', this.get('paramsUserProfile').get('userid'));
      let user = this.store.peekRecord('user', this.get('loggedinUser').user_id);

      connection.set('from', user);
      connection.set('to', target);

      connection.save().then(()=>{
        console.log('connection saved');
        callback();
      });
    },

    goToAsk: function (username) {
      console.log('routing to ask');
      this.transitionTo('ask', username); 
    }
  }
});

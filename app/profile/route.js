import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  connection: Ember.inject.service(),
  
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
      connectionStatus: this.get('connection').status(userid),
      accountProfile: this.store.findRecord('profile', ownerid),
      languages: this.store.query('language',{userid: userid}),
      experiences: this.store.query('experience',{userid: userid}),
      educations: this.store.query('education',{userid: userid}),
      questions: this.store.query('ask',{userid: userid}).then(function(asks){
         return asks.filterBy('answer');
      }),
      //trendingPosts: this.store.query('post', {userid: userid})
      trendingPosts: this.store.query('newsfeed',{filter: userid, tab: 'curated'})
    }).then((result)=>{
      self.set('connectionStatus', result.connectionStatus);
      self.set('accountProfile', result.accountProfile);
      self.set('languages', result.languages);
      self.set('experiences', result.experiences);
      self.set('educations', result.educations);
      self.set('trendingPosts', result.trendingPosts);
      self.set('lastestQuestion', result.questions.get('firstObject'));
    });
  },

  setupController: function(controller, model) {
    var avatar = this.get('accountProfile').get('avatarUrl');
    console.log('<<<<<<< avatar', avatar);
    controller.set('ownerid', this.get('session.data.authenticated.user_id'))
    controller.set('model',{
      connectionStatus: this.get('connectionStatus'),
      profile: this.get('paramsUserProfile'),
      avatar: avatar,
      loggedinUser: this.get('loggedinUser'),
      languages: this.get('languages'),
      educations: this.get('educations'),
      experiences: this.get('experiences'),
      trendingPosts: this.get('trendingPosts'),
      lastestQuestion: this.get('lastestQuestion')
    });
  },

  actions: {
    clickedConnect: function (cb) {
      console.log('connect =>');
      var userid = this.get('paramsUserProfile').get('userid');

      this.get('connection').request(userid)
      .then((res)=>{
        console.log('res=>', res)
        cb();
      });
    },

    clickedDisconnect: function () {
      console.log('disconnet =>');
      var userid = this.get('paramsUserProfile').get('userid');

      var self = this;
      this.get('connection').disconnect(userid)
      .then((res)=>{
        console.log('res=>', res);
        self.refresh();
      });
    },

    goToAsk: function (username) {
      console.log('routing to ask');
      this.transitionTo('ask', username); 
    }
  }
});

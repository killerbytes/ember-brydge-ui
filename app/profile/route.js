import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  connection: Ember.inject.service(),
  compliment: Ember.inject.service(),  
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
    return this.store.findRecord('public-profile', params.username)
  },
/*
  afterModelxx: function(model) {
    var userid = model.userid;
    var ownerid = this.get('loggedinUser').user_id;
    console.log(this, arguments)
    this.controller.set('public', model);
    var self = this;
    return Ember.RSVP.hash({
      // connectionStatus: this.get('connection').status(userid),
      accountProfile: this.store.findRecord('profile', ownerid),
      languages: this.store.query('language',{userid: userid}),
      experiences: this.store.query('experience',{userid: userid}),
      educations: this.store.query('education',{userid: userid}),
      questions: this.store.query('ask',{userid: userid}).then(function(asks){
         return asks.filterBy('answer');
      }),
      //trendingPosts: this.store.query('post', {userid: userid})
      trendingPosts: this.store.query('newsfeed',{filter: userid, tab: 'curated'}),
      compliments: this.store.query('compliment',{to: userid})
    }).then((result)=>{
      // self.set('connectionStatus', result.connectionStatus);
      self.set('accountProfile', result.accountProfile);
      self.set('languages', result.languages);
      self.set('experiences', result.experiences);
      self.set('educations', result.educations);
      self.set('trendingPosts', result.trendingPosts);
      self.set('questions', result.questions);
      self.set('compliments', result.compliments);
    });
  },
*/
  setupController: function(controller, model) {
    this._super(...arguments);
    var userid = model.get('userid');
    var ownerid = this.get('loggedinUser').user_id;
    Ember.RSVP.hash({
      me: this.store.findRecord('profile', ownerid),
      connections: this.store.query('connection',{userid: userid}),
      languages: this.store.query('language',{userid: userid}), 
      experiences: this.store.query('experience',{userid: userid}),
      educations: this.store.query('education',{userid: userid}),
      interests: this.store.query('interest',{userid: userid}),
      questions: this.store.query('ask',{userid: userid}).then(function(asks){
         return asks.filterBy('answer');
      }),
      trendingPosts: this.store.query('newsfeed',{filter: userid, tab: 'curated'}),
      compliments: this.store.query('compliment',{to: userid})
    }).then((result)=>{
      controller.setProperties(result);
    });
  },
  actions: {
    clickedConnect (cb) {
      var userid = this.get('currentModel.userid');
      this.get('connection').request(userid)
      .then((res)=>{
        console.log('res=>', res)
        cb();
      });
    },
    clickedDisconnect() {
      var userid = this.get('currentModel.userid');
      this.get('connection').disconnect(userid)
      .then((res)=>{
        this.refresh();
      });
    },
    goToAsk (username) {
      this.transitionTo('ask', username); 
    },
    postCompliment(){      
      var content = this.controller.get('complimentContent');
      var userid = this.get('currentModel.userid')
      var title = this.controller.get('complimentTitle');
      this.get('compliment').post(userid,title,content)
      .then((res)=>{
        console.log('compliment saved');
        this.controller.set('complimentContent', null);
      })
    }
  }
});

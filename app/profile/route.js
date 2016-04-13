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

    // return Ember.RSVP.hash({
    //   questions: this.store.query('ask',{userid: this.get('userid')}).then(function(asks){
    //      return asks.filterBy('answer');
    //   }),
    //   trendingPosts: this.store.query('post', {userid: userid})
    // }).then(function(result){
      
    //   result.questions.forEach(function(item){
    //     console.log('Qust => ',item.get('content'));
    //     console.log('Ans =>', item.get('answer'));
    //   });

    //   _this.set('trendingPosts',result.trendingPosts);
    //   _this.set('lastestQuestion', result.questions.get('firstObject'));
    // });
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
  }


  // beforeModel(transition) {
  //   const myUsername = this.get('session.data.authenticated.username');
  //   const paramsUsername = transition.params['profile'].username;

  //   this.set('currentUserid', this.get('session.data.authenticated.user_id'));

  //   if (myUsername === paramsUsername) {
  //     this.transitionTo('me');
  //     return;
  //   }
  // },

  // model: function(params) {
  //   this.set('username', params.username);
  //   return this.store.findRecord('public-profile', params.username);
  // },

  // afterModel: function(model, transition) {
  //   console.log(model.get('avatarUrl'),model.get('firstName'))

  //   let _this = this;

  //   // get current user id
  //   let ownerid = this.get('session.data.authenticated.user_id');
  //   _this.set('ownerid', ownerid);

  //   // get ask user id
  //   let userid = model.get('userid');
  //   _this.set('userid', userid);

  //   if (!userid) return true;

  //   // return Ember.RSVP.hash({
  //   //   toQuestions: this.store.query('ask',{to: this.get('userid')}),
  //   //   trendingPosts: this.store.query('post', {userid: userid})
  //   // }).then(function(result){
  //   //   _this.set('trendingPosts',result.trendingPosts);
  //   //   _this.set('lastestQuestion', result.toQuestions.get('firstObject'));
  //   // });

  //   console.log('userid =>', this.get('userid'))
  //   return Ember.RSVP.hash({
  //     questions: this.store.query('ask',{userid: this.get('userid')}).then(function(asks){
  //        return asks.filterBy('answer');
  //     }),
  //     trendingPosts: this.store.query('post', {userid: userid})
  //   }).then(function(result){
      
  //     result.questions.forEach(function(item){
  //       console.log('Qust => ',item.get('content'));
  //       console.log('Ans =>', item.get('answer'));
  //     });

  //     _this.set('trendingPosts',result.trendingPosts);
  //     _this.set('lastestQuestion', result.questions.get('firstObject'));
  //   });
  // },

  // setupController: function(controller, model) {
  //   controller.set('model',{
  //     profile: model,
  //     username: this.get('username'),
  //     ownerid: this.get('ownerid'),
  //     userid: this.get('userid'),
  //     trendingPosts: this.get('trendingPosts'),
  //     lastestQuestion: this.get('lastestQuestion')
  //   });
  // },

  // actions: {
  //   clickedConnect: function (callback) {
  //     console.log('component clicked');

  //     var _this = this;

  //     var connection = this.store.createRecord('connection');

  //     let target = this.store.peekRecord('user', this.get('userid'));
  //     let user = this.store.peekRecord('user', this.get('currentUserid'));

  //     connection.set('from', user);
  //     connection.set('to', target);

  //     connection.save().then(()=>{
  //       console.log('connection saved');
  //       callback();
  //     });
  //   },

  //   goToAsk: function (username) {
  //     console.log('routing to ask');
  //     this.transitionTo('ask', username); 
  //   }
  // }
});

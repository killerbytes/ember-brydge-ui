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
    // return this.get('sessionAccount.account')    
    if (loggedinUser.username === transition.params['profile'].username) {
      this.transitionTo('me');
      return;
    }
  },
  model: function(params) {
    var ownerid = this.get('session.data.authenticated.user_id');
    return this.store.findRecord('public-profile', params.username).then(res=>{
      var userid = res.get('id');
      return Ember.RSVP.hash({
        profile: res,
        me: this.store.findRecord('profile', ownerid),
        connections: this.store.query('connection',{userid: userid}),
        languages: this.store.query('language',{userid: userid}, {reload: true}), 
        experiences: this.store.query('experience',{userid: userid}),
        educations: this.store.query('education',{userid: userid}),
        interests: this.store.query('interest',{userid: userid}),
        questions: this.store.query('ask',{userid: userid}).then(function(asks){
           return asks.filterBy('answer');
        }),
        posts: this.store.query('newsfeed',{filter: userid, tab: 'profile'}),
        compliments: this.store.query('compliment',{to: userid})
      });
    })
    // console.log(arguments);

  },
  xxxsetupController: function(controller, model) {
    this._super(...arguments);
    console.log(model)
    // var userid = model.get('userid');
    // var ownerid = this.get('loggedinUser').user_id;
    // controller.set('isLoading', true);
    // Ember.RSVP.hash({
    //   me: this.store.findRecord('profile', ownerid),
    //   connections: this.store.query('connection',{userid: userid}),
    //   languages: this.store.query('language',{userid: userid}, {reload: true}), 
    //   experiences: this.store.query('experience',{userid: userid}),
    //   educations: this.store.query('education',{userid: userid}),
    //   interests: this.store.query('interest',{userid: userid}),
    //   questions: this.store.query('ask',{userid: userid}).then(function(asks){
    //      return asks.filterBy('answer');
    //   }),
    //   posts: this.store.query('newsfeed',{filter: userid, tab: 'profile'}),
    //   compliments: this.store.query('compliment',{to: userid})
    // }).then((result)=>{
    //   controller.setProperties(result);
    //   controller.set('isLoading', false);
    // });
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

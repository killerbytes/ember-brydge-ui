import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  BrydgeScroller, {
  session: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
  connection: Ember.inject.service(),
  notification: Ember.inject.service(),
  compliment: Ember.inject.service(),
  loggedinUser: null,
  paramsUserProfile: null,
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
      }
  },

  beforeModel: function(transition) {
    const loggedinUser = this.get('session.data.authenticated');
    this.set('loggedinUser', loggedinUser);
    if(!loggedinUser.user_id) this.transitionTo('home');
    if (loggedinUser.user_id === transition.params['profile'].username) {
      this.transitionTo('me');
      return;
    }
  },
  model: function(params) {
    var ownerid = this.get('session.data.authenticated.user_id');

    // return this.store.findRecord('profile', params.username).then(res=>{
      var userid = params.username;
      // console.log(params, userid)
      return Ember.RSVP.hash({
        profile: this.store.findRecord('profile', userid),
        username:  params.username,
        me: this.store.findRecord('profile', ownerid),
        connections: this.store.query('connection',{userid: userid}),
        experiences: this.store.query('experience',{userid: userid}),
        educations: this.store.query('education',{userid: userid}),
        questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
        // posts: this.store.query('newsfeed',{filter: userid, tab: 'profile'}),
        posts: this.brydgeScroller('newsfeed', {
          per_page: 5,
          scroller: 'newsfeed',
  				filter: userid,
  				tab: 'profile',
  				modelPath: 'controller.model.posts'
  			}),

        compliments: this.store.query('compliment',{to: userid, userid: userid})
      });
    // })
  },
  afterModel(model){
    this.get('notification').profileView(model.profile)
  },
  error() {
    this.transitionTo('home');
  },
  actions: {
    onClickedConnect (cb) {
      var userid = this.get('currentModel.profile.id');
      this.get('connection').request(userid)
      .then(res=>{
        var connection = this.store.createRecord('connection', res.data.attributes);
        var status = connection.get('status');
        cb.apply(null, [status]);
      });
    },
    onClickedDisconnect() {
      var userid = this.get('currentModel.profile.id');
      this.get('connection').disconnect(userid)
      .then((res)=>{
        this.refresh();
      });
    },
    goToAsk (username) {
    },
    postCompliment(){
      var content = this.controller.get('complimentContent');
      var userid = this.get('currentModel.profile.id')
      var title = this.controller.get('complimentTitle');
      this.get('compliment').post(userid,title,content)
      .then((res)=>{
        this.controller.set('complimentContent', null);
      })
    }
  }
});

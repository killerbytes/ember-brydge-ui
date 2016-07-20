import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  connection: Ember.inject.service(),
  compliment: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
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
    var ownerid = this.get('session.data.authenticated.user_id');

    // return this.store.findRecord('profile', params.username).then(res=>{
      var userid = params.username;
      // console.log(params, userid)
      return Ember.RSVP.hash({
        profile: this.store.findRecord('profile', userid),
        username:  params.username,
        me: this.store.findRecord('profile', ownerid),
        connections: this.store.query('connection',{userid: userid}),
        //languages: this.store.query('language',{userid: userid}, {reload: true}),
        experiences: this.store.query('experience',{userid: userid}),
        educations: this.store.query('education',{userid: userid}),
        //interests: this.store.query('interest',{userid: userid}),
        questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
        posts: this.store.query('newsfeed',{filter: userid, tab: 'profile'}),
        compliments: this.store.query('compliment',{to: userid, userid: userid})
      });
    // })
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
      Ember.get(this, 'flashMessages').success('Your question has been sent. Thank you!');
    },
    postCompliment(){
      var content = this.controller.get('complimentContent');
      var userid = this.get('currentModel.profile.id')
      var title = this.controller.get('complimentTitle');
      this.get('compliment').post(userid,title,content)
      .then((res)=>{
        Ember.get(this, 'flashMessages').success('Compliment has been sent. Thank you!');
        this.controller.set('complimentContent', null);
      })
    }
  }
});

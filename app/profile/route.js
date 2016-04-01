import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  beforeModel(transition) {
    const myUsername = this.get('session.data.authenticated.username');
    const paramsUsername = transition.params['profile'].username;

    // console.log("Transit to own profile?", myUsername, paramsUsername, (myUsername === paramsUsername));
    this.set('currentUserid', this.get('session.data.authenticated.user_id'));

    if (myUsername === paramsUsername) {
      this.transitionTo('me');
      return;
    }
  },

  model: function(params) {
    this.set('username', params.username);
    return this.store.findRecord('public-profile', params.username);
  },

  afterModel: function(model, transition) {

    let userid = model.get('userid');
    let _this = this;

    this.set('userid', userid);
    if (!userid) return true;

    return this.store.query('post', {
      userid: userid
    }).then(function(trendingPosts) {
      _this.set('trendingPosts', trendingPosts);
    });

  },

  setupController: function(controller, model) {
    model.username = this.get('username');
    controller.set('model', model)
    controller.set('trendingPosts', this.get('trendingPosts'))
  },

  actions: {
    clickedConnect: function (callback) {
      console.log('component clicked');
      
      let currentUserid = this.get('currentUserid');
      let userid = this.get('userid');
      
      console.log(currentUserid, userid)
      var connection = this.store.createRecord('connection',{
        to: userid
      });

      connection.save().then(()=>{
        console.log('connection saved');
        callback();
      });
     
    }
  }
});

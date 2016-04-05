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
    let _this = this;

    // get current user id
    let ownerid = this.get('session.data.authenticated.user_id');
    _this.set('ownerid', ownerid);

    // get ask user id
    let userid = model.get('userid');
    _this.set('userid', userid);

    if (!userid) return true;

    return this.store.query('post', {
      userid: userid
    }).then(function(trendingPosts) {
      _this.set('trendingPosts', trendingPosts);
    });
  },

  setupController: function(controller, model) {
    //model.username = this.get('username');
    //controller.set('model', model)
    //controller.set('trendingPosts', this.get('trendingPosts'))

    controller.set('model',{
      username: this.get('username'),
      ownerid: this.get('ownerid'),
      userid: this.get('userid'),
      trendingPosts: this.get('trendingPosts')
    });
  },

  actions: {
    clickedConnect: function (callback) {
      console.log('component clicked');

      var _this = this;

      var connection = this.store.createRecord('connection');

      let target = this.store.peekRecord('user', this.get('userid'));
      let user = this.store.peekRecord('user', this.get('currentUserid'));

      connection.set('from', user);
      connection.set('to', target);

      connection.save().then(()=>{
        console.log('connection saved');
        callback();
      });

      // this.store.peekRecord('user', this.get('userid')).then((targetUser)=>{
      //   this.store.peekRecord('user', this.get('currentUserid')).then((user)=>{
      //     connection.set('from', user);
      //     connection.set('to', targetUser);

      //     connection.save().then(()=>{
      //       console.log('connection saved');
      //       callback();
      //     });
      //   });  
      // });
    }
  }
});

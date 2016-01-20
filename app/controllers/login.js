import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
    
      let { username, password } = this.getProperties('username', 'password');
      console.log(username, password);


      const _this = this;

      this.get('session').authenticate('authenticator:oauth2', username, password)
        .then(() => {
          // _this.transitionToRoute('newsfeed');
        },
        (err) => {
          this.set('errorMessage', err.responseText || err || 'unknown login failure');
          console.log(err, this.get('errorMessage'));
        });

    }
  }
});

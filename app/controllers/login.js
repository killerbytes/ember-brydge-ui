import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
    
      let { username, password } = this.getProperties('username', 'password');
      // console.log(username, password);

      this.get('session').authenticate('authenticator:oauth2', username, password)
        .catch((reason) => {
          console.log(reason);
          this.set('errorMessage', reason.error || reason);
        });

    }
  }
});

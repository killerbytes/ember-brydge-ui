import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  auth: Ember.inject.service(),
  actions: {
    authenticate() {

      let { email, password } = this.getProperties('email', 'password');

      const _this = this;

      this.get('session').authenticate('authenticator:oauth2', email, password)
        .then((user) => {
          const userid = _this.get('session.data.authenticated.account_id');
          _this.get('session').set('data.userid', userid);
          _this.transitionToRoute('home');
        },
        (err) => {
          this.set('errors', err.errors);
        });

    },
  }
});

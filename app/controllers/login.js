import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {

      let { email, password } = this.getProperties('email', 'password');
      //console.log(email, password);

      const _this = this;

      this.get('session').authenticate('authenticator:oauth2', email, password)
        .then((user) => {
          // _this.transitionToRoute('newsfeed');
          const userid = _this.get('session.data.authenticated.account_id');
          const name = _this.get('session.data.authenticated.name');
          _this.get('session').set('data.userid', userid);
          _this.get('session').set('data.name', name);

        },
        (err) => {
          this.set('errorMessage', err.errors[0].details);
          // console.log(err, this.get('errorMessage'));
        });

    }
  }
});

import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  auth: Ember.inject.service(),
  isInvalid: Ember.computed('email', 'password', function(){
    return !(this.get('email') && this.get('password'));
  }),
  actions: {
    proceed(){
      this.transitionToRoute('register', {queryParams: {code: this.get('code') }});
    },
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

    createAccount: function (cb) {

      var data = {
        email: this.get('registerEmail'),
        password: this.get('registerPassword'),
        firstName: this.get('registerFirstName'),
        lastName: this.get('registerLastName')
      };

      const _this = this;
      this.set('signupError', '');


      this.get('auth').signup(data)
        .then((res)=>{

          this.get('session').authenticate('authenticator:oauth2', data.email, data.password)
            .then((user) => {
              const userid = _this.get('session.data.authenticated.account_id');
              _this.get('session').set('data.userid', userid);
              cb();
              _this.transitionToRoute('home');
            })
        })
        .catch((err)=>{
          this.set('registerEmail','');
          this.set('registerPassword','');
          this.set('registerFirstName', '');
          this.set('registerLastName','');
          this.set('signupError', err.errors[0].detail);
          cb();
        });
    }
  }
});

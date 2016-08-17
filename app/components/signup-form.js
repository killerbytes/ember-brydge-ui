import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['bg-sky-blue', 'clearfix'],
  actions: {
    save: function() {
      const name = this.get('name');
      const email = this.get('email');
      const password = this.get('password');

      this.sendAction('signupUser', {name:name, username:email, password:password});

      return true;

    }
  }
});

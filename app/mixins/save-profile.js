import Ember from 'ember';

export default Ember.Mixin.create({
  flashMessages: Ember.inject.service(),
  actions: {
    save: function () {
      this.get('profile').save().then(()=>{
        Ember.get(this, 'flashMessages').success('Success!');
      });
    }
  }
});

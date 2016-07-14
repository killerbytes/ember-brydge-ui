import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service(),
  store: Ember.inject.service(),
  utils: Ember.inject.service(),
	actions: {
    edit(){
      this.get('utils').edit(...arguments);
    },
  	submit: function() {
      this.get('store').createRecord('message', {
        content: this.get('utils').insertParagraph(this.get('message')),
        userid: this.get('to')
      }).save().then(res=>{
        this.set('message', null);
        this.sendAction('resp', res.get('conversationid'));
      })
  	}
  }
});

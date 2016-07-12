import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service(),
  ajax: Ember.inject.service(),
  utils: Ember.inject.service(),
	actions: {
    edit(){
      this.get('utils').edit(...arguments);
    },
  	submit: function() {
      var url = '/v1/messages';
      this.get('ajax').request(url, {
        method: 'POST',
        data: {
          content: this.get('utils').insertParagraph(this.get('message')),
          to_id: this.get('to'),
          to_type: "User"
        }
      }).then(res =>{
        this.set('message', null);
        this.sendAction('resp', res.data.attributes.conversationId);
      });
  	}
  }
});

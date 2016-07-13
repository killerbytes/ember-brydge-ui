import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  utils: Ember.inject.service(),
	actions: {
    edit(){
      this.get('utils').edit(...arguments);
    },
  	submit: function() {
      this.get('store').createRecord('message', {
        content: this.get('utils').insertParagraph(this.get('message')),
        userid: this.get('session.data.authenticated.user_id')
      }).save().then(res=>{
        console.log(res)
        this.set('message', null);
        this.sendAction('resp', res.get('conversationid'));

      })
      // var url = '/v1/messages';
      // this.get('ajax').request(url, {
      //   method: 'POST',
      //   data: {
      //     content: this.get('utils').insertParagraph(this.get('message')),
      //     to_id: this.get('to'),
      //     to_type: "User"
      //   }
      // }).then(res =>{
      // });
  	}
  }
});

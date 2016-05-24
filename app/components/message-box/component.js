import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  utils: Ember.inject.service(),
  classNames: ['message-box'],
	actions: {
  	submit: function(to, msg) {
  		var store = this.get('store');
      var url = '/v1/messages';
      this.get('ajax').request(url, {
        method: 'POST',
        data: {
          content: this.get('utils').insertParagraph(msg),
          to_id: to,
          to_type: "User"
        }
      }).then(res =>{
        // this.get('store').findRecord('conversation', '311brdcu6o0r');
        // this.get('store').findRecord('conversation');
        this.set('msg', null);
        this.sendAction('resp', res.data.attributes.conversationId);
        // store.findAll('conversation');


      });

  		// var ctx = this;

      // var message = store.createRecord('message', {
      //   content: msg
      // });

      // store.findRecord('user', to).then((user)=>{
      //   message.set('to', user);
      //   message.save().then((res)=>{
      //     this.sendAction('resp', { to: to});

      //     //store.set('message',store.createRecord('message'));

      //     // Reset the text message field
      //     //ctx.set( 'to', '' );
      //     this.set('msg', '');
      //     // console.log(res);
      //     // store.push(res);
      //     store.findAll('conversation');
      //     // console.log(res)
    
      //   });

      // });
  	}
  }
});

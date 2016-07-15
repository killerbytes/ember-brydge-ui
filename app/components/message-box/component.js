import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service(),
  store: Ember.inject.service(),
  utils: Ember.inject.service(),
  didReceiveAttrs(){
    this._super();
    console.log('didUpdateAttrs')
    this.set('message', null);
  },
	actions: {
    edit(){
      this.get('utils').edit(...arguments);
      var $scrollable = this.$().parents('section.message-box').find('.message-scrollable');
      // console.log(, this.$().parent().outerHeight())
      $scrollable.animate({'scrollTop': $scrollable.find('ul:first').height()});
      $scrollable.height(500- (this.$().parent().outerHeight()-144) + 'px');
    	// this.set('dHeight', 500- this.get('height')+ 'px');

      // this.set('height', this.$().parents('section:first').outerHeight() - 145)
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

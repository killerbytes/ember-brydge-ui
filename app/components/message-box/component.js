import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['message-box', 'container'],
  tagName: 'section',
  sessionAccount: Ember.inject.service(),
  store: Ember.inject.service(),
  utils: Ember.inject.service(),
  onTextChange: Ember.observer('message', function() {
    this.get('utils').textAreaChange(this.$('textarea'), this.get('message'));
    this.scrollBottom();
  }),

  scrollBottom(){
    var $scrollable = this.$('.message-scrollable');
    $scrollable.animate({'scrollTop': $scrollable.find('ul:first').height()});
  },
  didReceiveAttrs(){
    this._super();
    this.set('message', null);
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.scrollBottom();
    })

  },
	actions: {
    clear(){
      this.set('message', null);
      this.scrollBottom();
    },
  	submit: function() {
      this.get('store').createRecord('message', {
        content: this.get('utils').insertParagraph(this.get('message')),
        userid: this.get('to.id')
      }).save().then(res=>{
        this.set('message', null);
        this.sendAction('resp', res.get('conversationid'));
      })
  	}
  }
});

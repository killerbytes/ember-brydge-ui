import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['message-box', 'container'],
  tagName: 'section',
  sessionAccount: Ember.inject.service(),
  store: Ember.inject.service(),
  utils: Ember.inject.service(),
  sort: ['updatedAt'],
  initial: true,
  messages: Ember.computed.sort('model', 'sort'),
  onTextChange: Ember.observer('message', function() {
    this.get('utils').textAreaChange(this.$('textarea'), this.get('message'));
    this.scrollBottom();
    // var height = this.$().height();
    this._resize();

  }),
  _resize(){
    var height = Ember.$('.box').height();
    this.$().height((height - Ember.$('.message-box').siblings('.pane-header').outerHeight()) + 'px');
    // Ember.$('.message-box').height((height - Ember.$('.message-box').siblings('.pane-header').outerHeight()) + 'px');
    // Ember.$('.message-scrollable').css('max-height',(this.$().height()- Ember.$('.message-form').outerHeight()) + 'px');
    var h = this.$().height();
    this.$('.message-scrollable').css('max-height', h - this.$('.message-form').outerHeight() + 1 + 'px');
    var top  = h - this.$('.message-scrollable').outerHeight() - this.$('.message-form').outerHeight();
    this.$('.message-scrollable').css({
      top:  top <=0 ? 0 : top + 'px',
      bottom: 'auto'
    });

  },
  scrollBottom(){
    var $scrollable = this.$('.message-scrollable');
    $scrollable.animate({'scrollTop': $scrollable.find('ul:first').height()});
  },
  didInsertElement(){
    this._super(...arguments);
    this._resize();
  },
  didReceiveAttrs(attrs){
    this._super(...arguments);
    this.set('message', null);
    Ember.run.scheduleOnce('afterRender', this, function(){
      if( (attrs.oldAttrs && attrs.oldAttrs.to.value.get('id') != attrs.newAttrs.to.value.get('id')) || !attrs.oldAttrs){
        this.scrollBottom();
      }
      Ember.$('.message-scrollable').on('scroll', ()=>{
				this._checkElementInView(Ember.$('.message-scrollable'));
			})
      this._resize();
    })
  },
  _checkElementInView(el){
		var pos = el.get(0);
		if(pos.scrollTop == 0) this._loadRecords(el);
	},
  _loadRecords(el){
    var height = el.find('.messages-list').height();
		this.sendAction('load', 'messages', ()=>{
      Ember.run.next(this, function() {
        $('.message-scrollable').scrollTop($('.messages-list').height() - height)
     });
    })
	},

	actions: {
    clear(){
      this.set('message', null);
      this.scrollBottom();
    },
  	submit: function() {
      this.get('store').createRecord('message', {
        // content: this.get('utils').insertParagraph(this.get('message')),
        content: this.get('message'),
        recipient: this.get('to.id')
      }).save().then(res=>{
        this.get('messages').pushObject(res);
        this.set('message', null);
        this.sendAction('resp', res.get('conversationid'));
      })
  	}
  }
});

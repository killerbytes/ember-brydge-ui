import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['message-box', 'container'],
  tagName: 'section',
  sessionAccount: Ember.inject.service(),
  store: Ember.inject.service(),
  utils: Ember.inject.service(),
  onTextChange: Ember.observer('message', function() {
    this.get('utils').textAreaChange(this.$('textarea'), this.get('message'));
    this.resize();
  }),

  resize(){
    var $scrollable = this.$('.message-scrollable');
    $scrollable.animate({'scrollTop': $scrollable.find('ul:first').height()});
    console.log($scrollable.parent().height(), 645)
    if($scrollable.parent().height() >= 645){
      $scrollable.height(500- ($scrollable.next().outerHeight()-144) + 'px');
    }else{
      $scrollable.height('auto');
    }
  },
  didReceiveAttrs(){
    this._super();
    this.set('message', null);
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.resize();
    })

  },
	actions: {
    clear(){
      this.set('message', null);
      this.resize();
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

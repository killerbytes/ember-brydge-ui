import Ember from 'ember';

export default Ember.Component.extend({
	utils: Ember.inject.service(),
	classNameBindings: ['isCollapsed'],
	tagName: 'span',
	limit: 280,
	isCollapsed: Ember.computed('content', function() {
		return this.get('content.length') >= this.get('limit') ? true : false;
	}),
	text: Ember.computed('content', function(){
		return this.get('content').substr(0, this.get('limit')) + '... ';
  }),
	fullText: Ember.computed('content', function(){
    return this.get('content');
  }),
	actions: {
		seeMore(){
      this.set('isCollapsed', false);
    }
	}

});

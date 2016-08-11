import Ember from 'ember';

export default Ember.Component.extend({
	utils: Ember.inject.service(),
	classNames: ['paragraph'],
	classNameBindings: ['isCollapsed'],
	limit: 280,
	isCollapsed: Ember.computed('content', function() {
		return this.get('content.length') >= this.get('limit') ? true : false;
	}),
	text: Ember.computed('content', 'isCollapsed', function(){
		var str = this.get('content');
		var text = str.replace(/[\r\n]/g, '');
    return this.get('isCollapsed') ? text.substr(0, this.get('limit')) + '... ' : this.get('content');
  }),
	actions: {
		seeMore(){
      this.set('isCollapsed', false);
    }
	}

});

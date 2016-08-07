import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['paragraph'],
	classNameBindings: ['isCollapsed'],
	limit: 280,
	isCollapsed: Ember.computed('content', function() {
		return this.get('content.length') >= this.get('limit') ? true : false;
	}),
	text: Ember.computed('content', 'isCollapsed', function(){
    return this.get('isCollapsed') ? this.get('content').substr(0,this.get('limit')) + '... ' : this.get('content');
  }),
	actions: {
		seeMore(){
      this.set('isCollapsed', false);
    }
	}

});

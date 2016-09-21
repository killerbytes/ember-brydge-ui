import Ember from 'ember';

export default Ember.Component.extend({
	utils: Ember.inject.service(),
	classNameBindings: ['isCollapsed'],
	limit: 280,
	isCollapsed: Ember.computed('content', function() {
		return this.get('content.length') >= this.get('limit') ? true : false;
	}),
	text: Ember.computed('content', function(){
		// var str = this.get('utils').lineBreaker(this.get('content'));
		// var text = str.replace(/[\r\n]/g, '');
		// console.log(this.get('isCollapsed'), this.get('content'))
		return this.get('content').substr(0, this.get('limit')) + '... ';
    // return this.get('isCollapsed') ? (text.substr(0, this.get('limit')) + '... ') : this.get('content');
  }),
	fullText: Ember.computed('content', function(){
		// var str = this.get('utils').lineBreaker(this.get('content'));
		// var text = str.replace(/[\r\n]/g, '');
		// console.log(this.get('content'))
    return this.get('content');
  }),
	actions: {
		seeMore(){
      this.set('isCollapsed', false);
    }
	}

});

import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['brydge-scroller'],
	didInsertElement(){
		Ember.run.later(()=>{
			this.set('el', this.$().get(0));
			window.addEventListener('resize', ()=>{
				this.onResize();
			})
			this.onResize();
			Ember.$(document).on('scroll', ()=>{
				this._checkElementInView();
			})
			
		})
	},
	_checkElementInView(){
		var pos = this.get('el').getBoundingClientRect();
		console.log(pos.top, this.get('height'))
		if(pos.top <= this.get('height')) this._loadRecords();
	},
	_loadRecords(){
		this.sendAction('onClick')
	},
	onResize(){
		this.set('height', window.innerHeight );
		this._checkElementInView();
	},

});

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
		// var delay = (()=>{
		// 	return (callback, ms)=>{
		// 		clearTimeout(this.get('timer'));
		// 		this.set('timer', setTimeout(callback, ms))
		// 	};
		// })();

		// delay(()=>{
		if(!Ember.$(this.get('el')).is(':visible')) return false;

			var pos = this.get('el').getBoundingClientRect();
			console.log(pos.top, this.get('height'), Ember.$(this.get('el')).is(':visible'))
			if(pos.top <= this.get('height') && Ember.$(this.get('el')).is(':visible')) this._loadRecords();
		// }, 500)

	},
	_loadRecords(){
		this.sendAction('onClick')
	},
	onResize(){
		this.set('height', window.innerHeight );
		this._checkElementInView();
	},

});

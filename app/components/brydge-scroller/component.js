import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['brydge-scroller'],
	willDestroyElement() {
	  this._super(...arguments);
		window.removeEventListener('resize', ()=>{
			this._onResize();
		});
		this.set('timer', null);
	},
	didInsertElement(){
		this.set('timer', null);
		Ember.run.later(()=>{

			this.set('el', this.$().get(0));
			window.addEventListener('resize', ()=>{
				this._onResize();
			})
			this._onResize();
			Ember.$(document).on('scroll', ()=>{
				//TODO: Add Delay on scroll
				// var delay = (()=>{
				// 	return (callback, ms)=>{
				// 		clearTimeout(this.get('timer'));
				// 		ret
				// 		this.set('timer', setTimeout(callback, ms))
				// 	};
				// })();

				// delay(()=>{
					this._checkElementInView();
				// }, 500)

			})

		})
	},
	_checkElementInView(){
		if(!Ember.$(this.get('el')).is(':visible')) return false;
		var pos = this.get('el').getBoundingClientRect();

		if(pos.top <= this.get('height') && Ember.$(this.get('el')).is(':visible')) this._loadRecords(this.get('el.id'));

	},
	_loadRecords(el){
		this.sendAction('onClick', el)
	},
	_onResize(){
		if(this.get('isDestroyed') || this.get('isDestroying')) return false;
		this.set('height', window.innerHeight );
		this._checkElementInView();
	},

});

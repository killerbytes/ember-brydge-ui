import Ember from 'ember';

export default Ember.Component.extend({
	text: 'Save',
	_reset(){
		if(this.get('isDestroyed') || this.get('isDestroying')) return false;

		this.set('isSuccess', false);
		this.set('warning', false);
		this.$('.faded').removeClass('error');
		Ember.run.later(()=>{
			this.set('customPlaceHolder', null);
		},500);
	},
	actions: {
		submit(){
			this.set('isLoading', true);
			this.sendAction('submit', this.get('item'), (success=true, placeholder, warning)=>{
				if(this.get('isDestroyed') || this.get('isDestroying')) return false;
				if(placeholder) this.set('customPlaceHolder', placeholder);
				if(warning) this.set('warning', warning);
				this.set('isLoading', false);
				this.set('isSuccess', success);
				Ember.run.later(()=>{
					this._reset();
				}, 5000)
			});
		}
	}
});

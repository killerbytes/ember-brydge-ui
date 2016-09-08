import Ember from 'ember';

export default Ember.Component.extend({
	text: 'Save',
	actions: {
		submit(){
			this.set('isLoading', true);
			this.sendAction('submit', this.get('item'), (success=true, placeholder, warning)=>{
				if(this.get('isDestroyed') || this.get('isDestroying')) return false;
				if(placeholder) this.set('placeholder', placeholder);
				if(warning) this.set('warning', warning);
				this.set('isLoading', false);
				this.set('isSuccess', success);
				Ember.run.later(()=>{
					if(this.get('isDestroyed') || this.get('isDestroying')) return false;
					this.set('isSuccess', false);
					this.set('warning', false);
					this.$('.faded').removeClass('error')
				}, 5000)
			});
		}
	}
});

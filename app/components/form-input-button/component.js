import Ember from 'ember';

export default Ember.Component.extend({
	text: 'Save',
	actions: {
		submit(){
			this.set('isLoading', true);
			this.sendAction('submit', this.get('item'), (success=true)=>{
				if(this.get('isDestroyed') || this.get('isDestroying')) return false;
				this.set('isLoading', false);
				this.set('isSuccess', success);
				Ember.run.later(()=>{
					if(this.get('isDestroyed') || this.get('isDestroying')) return false;
					this.set('isSuccess', false);
				}, 5000)
			});
		}
	}
});

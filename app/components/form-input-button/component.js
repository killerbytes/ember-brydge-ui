import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['float-left'],
	actions: {
		submit(){
			this.set('isLoading', true);
			this.sendAction('submit', this.get('item'), (success=true)=>{

				this.set('isLoading', false);
				this.set('isSuccess', success);
				Ember.run.later(()=>{
					this.set('isSuccess', false);
				}, 5000)
			});
		}
	}
});

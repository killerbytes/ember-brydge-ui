import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
    submit(cb){
			this.sendAction('submit', this.get('item'));
    }
	}
});

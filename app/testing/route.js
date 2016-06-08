import Ember from 'ember';

export default Ember.Route.extend({
	model(){
		return this.store.query('experience',{userid: '2zd33na16gv'})
	}
});

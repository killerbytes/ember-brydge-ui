import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	connection: Ember.inject.service(),
	ajax: Ember.inject.service(),
	init(){
		this._super(...arguments);
		var url = "https://api.brydge.me/v2/profiles/"+this.get('profile.publicProfile') ;
		console.log(this.get('ajax').set('headers', null))
		this.get('ajax').request(url).then(res=>{
			this.set('user', res.data.attributes);
		})
	},
	_reset(){
		if(this.get('isDestroyed') || this.get('isDestroying')) return false;
		// this.$('.faded').removeClass('error');
		Ember.run.later(()=>{
			this.set('message', null);
		},500);
	},

	publicProfile: Ember.computed('profile.publicProfile', function(){
		return `https://brydge.com/${this.get('profile.publicProfile')}`
	}),
	connections: Ember.computed(function(){
		var promise = this.get('connection').count(this.get('profile.id')).then(res=>{
			return res;
		})
		return DS.PromiseObject.create({
			 promise: promise
		});
	}),
	actions: {
		success(){
			this.set('message', 'Copied to clipboard');
			Ember.run.later(()=>{
				this._reset();
			}, 5000)

		}
	}
});

import Ember from 'ember';
import DS from 'ember-data';
import BrydgeReveal from '../brydge-reveal';

export default BrydgeReveal.extend({
	store: Ember.inject.service(),
	connection: Ember.inject.service(),
	ajaxApi: Ember.inject.service(),
	willDestroyElement(){
		$('#dialog-share-profile').parent().remove();
		this._super(...arguments);
	},

	init(){
		this._super(...arguments);
		this.get('ajaxApi').set('headers', null);
		this.get('ajaxApi').request('/v2/profiles/'+ this.get('profile.publicProfile')).then(res=>{
			this.set('user', res.data.attributes);
		})
	},
	_reset(){
		if(this.get('isDestroyed') || this.get('isDestroying')) return false;
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

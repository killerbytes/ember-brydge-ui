import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

export default Ember.Component.extend({
	settings: Ember.inject.service(),
	classNames: ['brydge-form'],
	tagName: 'form',
	attributeBindings: ['onsubmit'],
	submit(){
		return false;
	},
	keywords: Ember.computed('profile.snapshot', function(){
    return this.get('profile.snapshot') && this.get('profile.snapshot').split(',') || [];
  }),
	actions: {
		add(item){
      if(!this.get('keyword') || this.get('keywords').length >= 10) return false;
      this.get('keywords').pushObject(item.toLowerCase());
      this.set('keyword', null);

    },
		remove(item){
			this.get('keywords').removeObject(item);
		},
		save(item, cb){
			if(this.get('keywords')) this.set('profile.snapshot', this.get('keywords').join(','))
      this.get('profile').save().then(()=>{
        cb.apply()
      });
		}
	}
});

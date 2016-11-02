import Ember from 'ember';
import BrydgeReveal from '../brydge-reveal';

export default BrydgeReveal.extend({
	willDestroyElement(){
		this._super(...arguments);
	},
	actions: {
		authenticate(){
			this.sendAction('onAuthenticate', this.get('email'), this.get('password'), (err)=>{
				this.set('errors', err.errors);
			});
		}

	}
});

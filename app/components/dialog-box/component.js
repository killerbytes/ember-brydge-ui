import Ember from 'ember';
import BrydgeReveal from '../brydge-reveal';

export default BrydgeReveal.extend({
	willDestroyElement(){
		$('#dialog-box-' + this.get('name') + '-' + this.get('item.id')).parent().remove();
		this._super(...arguments);
	},
	_close(){
		$('#dialog-box-' + this.get('name') + '-' + this.get('item.id')).foundation('close');
	},
	actions: {
    submit(cb){
			this.sendAction('submit', this.get('item'));
			this._close();
    }
	}
});

import Ember from 'ember';

export default Ember.Component.extend({
	willDestroyElement(){
		$('#dialog-box-' + this.get('name') + '-' + this.get('item.id')).parent().remove();
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

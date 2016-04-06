import Ember from 'ember';

export default Ember.Component.extend({
	_fileChanged: function(evt) {
		console.log('file change', evt.target.files[0]);
		var _this = this;
		this.sendAction('fileLoaded', evt.target.files[0]);

		var oFReader = new FileReader();
	  oFReader.readAsDataURL(evt.target.files[0]);
	  
	  oFReader.onload = function(oFREvent) {
	  	_this.set('logoUrl',oFREvent.target.result);
	  };
	},

	actions: {
		clicked: function () {
			var $input = this.$('input');
			$input.focus().click();
    	$input.on('change', this._fileChanged.bind(this));
		}
	}
});

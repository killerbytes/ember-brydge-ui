import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	tagName: 'form',
  attributeBindings: ['role', 'method', 'enctype'],
 	role: "form",
 	method: "POST",
 	enctype: "multipart/form-data", 	
	_fileChanged: function(evt) {
		console.log('file change', evt.target.files[0]);
		var _this = this;

		var form = this.$('form')[0]; // You need to use standart javascript object here
		var formData = new FormData(form);
		
		var oFReader = new FileReader();
	  oFReader.readAsDataURL(evt.target.files[0]);
	  
	  oFReader.onload = function(oFREvent) {
	  	_this.set('logoUrl',oFREvent.target.result);
	  	_this.sendAction('fileLoaded', formData);
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

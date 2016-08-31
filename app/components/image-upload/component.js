import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	tagName: 'form',
	classNames: 'avatar-wrapper',
  attributeBindings: ['role', 'method', 'enctype'],
 	role: "form",
 	method: "POST",
 	enctype: "multipart/form-data",
	_fileChanged: function(evt) {
		var _this = this;

		var form = this.$()[0]; // You need to use standart javascript object here
		var formData = new FormData(form);


		var reader = new FileReader();
	  reader.readAsDataURL(evt.target.files[0]);

	  reader.onload = e=>{
			this.set('isLoading', true);
	  	this.sendAction('fileLoaded', formData, ()=>{
				this.set('isLoading', false);
			});
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

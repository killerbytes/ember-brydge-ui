import InputComponent from 'ember-rapid-forms/components/em-input';
export default InputComponent.extend({
  fileInputEl: null,
  type: 'file',

  _fileChanged: function() {
    console.log('file changed')
  },

  didInsertElement: function() {
    console.log('didInsertElement');
    var $input = this.$('input');
    this.set('fileInputEl', $input[0]);
    $input.on('change', this._fileChanged.bind(this));
  }
})
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['category'],
  category: 'azid',
  froalaEditor: {
    params: {
      placeholder: 'Enter..',
      // toolbarButtons: [],
      // toolbarButtonsMD: [],
      // toolbarButtonsSM: [],
      // toolbarButtonsXS: [],
        // For more params refer: 'https://www.froala.com/wysiwyg-editor/docs/options'
    },
  },
  actions: {
  	change: function(){
      this.set('output', $('.froalaEditor').froalaEditor('html.get'));
  	}
  }
});

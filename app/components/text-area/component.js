import Ember from 'ember';


export default Ember.TextArea.extend({
	attributeBindings: ['rows'],
	rows: 1,
	keyDown: function (event) {
		if (event.which === 13 && ! event.shiftKey) {
			event.preventDefault();
		}
	},
	insertNewline: function (event) {
		if (! event.shiftKey) {
			// Do not trigger the "submit on enter" action if the user presses
			// SHIFT+ENTER, because that should just insert a new line
			this._super(event);
		}
	}
});

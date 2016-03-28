import Ember from 'ember';

const pizzas = [{
    id: "mar",
    text: "Margherita",
    description: "The original italian one"
  }, {
    id: "pep",
    text: "Peperoni",
    description: "For the Peperoni lovers"
  }, {
    id: "ham",
    text: "Ham",
    description: "Another well known classic"
  }, {
    id: "haw",
    text: "Hawaii",
    description: "For the exotic ones"
  }];

export default Ember.Route.extend({
  industry: null,
  occupOne: null,
  occupTwo: null,

	model: function() {
		return pizzas;
	},

  actions: {
    checkboxChanged: function(value, checked) {
      console.log('<<< action-checkbox component <<<', value, checked);
    },

    selectionChanged: function(id, code, text) {
      console.log('<< typeahead component <<<', id, code, text);
    },

    inputChanged: function(value, id) {
      console.log('<<< action-input component <<<<', value, id)
    }
  }
});
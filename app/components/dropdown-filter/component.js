import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['dropdown-select'],
	attributeBindings: ['tabindex'],
	isOpen: false,
	tabindex: 0,
	list: [],
	init: function(){
    this._super(...arguments);
		this.set('list', this.get('items'))
		this.set('selected', { name: this.get('model') })
	},
	filter: function(list, query){
		return _.filter(list, function(i) {
			var found = false;
			var fields = ["name"];
			_.forEach(fields, function(key) {
				if (i[key] && i[key].toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false) {
					found = true;
					return false;
				}
			})
			return found;
		})
	},
	focusOut: function(e){
			Em.run.later(this, function() {
        var focussedElement = document.activeElement;
        var target = this.$();
				if (target) {
          var isFocussedOut = target.has(focussedElement).length === 0 && !target.is(focussedElement);
          if(isFocussedOut) {
            this.set('isOpen', false);
          }
        }
      }, 0);
	},
	actions: {
		onchange: function(e){
			let items = this.get('items');
			this.set('list', this.filter(items, e))
		},
		open: function(){
			this.set('list', this.filter(this.get('items'), ''))
			this.set('isOpen', true)
		},
		select: function(selected) {

			this.set('model', _.clone(selected[this.get('field')]));
			this.set('selected', _.clone(selected));
			this.set('isOpen', false);

		},
		clear: function(){
			this.set('model', null);
			this.set('selected', null)
		},
		openMe: function(){
			this.sendAction("onclick")
		}

	}
});

import Ember from 'ember';
export default Ember.Component.extend({
  attributeBindings: ['rows'],
	limit: 300,
	value: "",
	count: Ember.computed('value',function(){
		var value = this.get('value') || "";
		return this.get('limit') - value.length;
	})
});

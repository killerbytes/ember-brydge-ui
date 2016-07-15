import Ember from 'ember';

export default Ember.Helper.helper(function([height]){
	return Ember.String.htmlSafe("height:" + height);
});

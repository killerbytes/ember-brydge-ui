import Ember from 'ember';

export default Ember.Helper.helper(function([url]){
	return Ember.String.htmlSafe("background-image: url(" + url + ')' );
});

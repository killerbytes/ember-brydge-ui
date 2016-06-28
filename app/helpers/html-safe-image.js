import Ember from 'ember';

export default Ember.Helper.helper(function([url]){
	var url = url || 'assets/blank-user.jpg';
	return Ember.String.htmlSafe("background-image: url(" + url + ')' );
});

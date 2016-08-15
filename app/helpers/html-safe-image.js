import Ember from 'ember';

export default Ember.Helper.helper(function([url, preview=true]){
	console.log(preview)
	var url = url || (preview ? 'assets/blank-user.jpg' : '');

	return Ember.String.htmlSafe("background-image: url(" + url + ')' );
});

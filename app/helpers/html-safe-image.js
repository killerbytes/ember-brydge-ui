import Ember from 'ember';

export default Ember.Helper.helper(function([url, preview=true]){
	var url = url || (preview ? 'https://storage.googleapis.com/brydge-assets/blank-user.jpg' : '');

	return Ember.String.htmlSafe("background-image: url(" + url + ')' );
});

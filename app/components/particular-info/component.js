import Ember from 'ember';
import GetCountryListMixin from 'web/mixins/get-country-list';

export default Ember.Component.extend(GetCountryListMixin,{
	actions: {
		save: function () {
			this.get('profile').save().then(()=>{
				console.log('particular info saved');
			});
		}
	}
});

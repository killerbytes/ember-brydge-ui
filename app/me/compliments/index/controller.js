import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';
import FilteredComplimentsMixin from 'web/mixins/filtered-compliments';

export default Ember.Controller.extend(
	ComplimentTitlesMixin,
	FilteredComplimentsMixin, {
	profile: Ember.computed.alias('model.profile')  
});
import DS from 'ember-data';
import Validations from './validations/language';

export default DS.Model.extend(Validations, {
	proficiency: DS.attr(),
	userid: DS.attr(),
	name: DS.attr()
});

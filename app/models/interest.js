import DS from 'ember-data';
import Validations from './validations/interest';

export default DS.Model.extend(Validations, {
	content: DS.attr()
});

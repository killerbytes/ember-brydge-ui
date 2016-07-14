import DS from 'ember-data';
import Validations from './validations/register';

export default DS.Model.extend(Validations, {
  email: DS.attr(),
  password: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  gender: DS.attr(),
  location: DS.attr()
});

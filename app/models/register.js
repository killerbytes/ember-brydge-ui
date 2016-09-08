import DS from 'ember-data';
import Validations from './validations/register';

export default DS.Model.extend(Validations, {
  email: DS.attr(),
  confirmEmail: DS.attr(),
  password: DS.attr(),
  confirmPassword: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  gender: DS.attr(),
  dob: DS.attr(),
  location: DS.attr(),
  placeid: DS.attr(),
  userid: DS.attr(),
  token: DS.attr()
});

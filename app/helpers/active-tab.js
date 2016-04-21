import Ember from 'ember';

export function activeTab([key, active]/*, hash*/) {
	
  return key == active ? 'is-active': null;
}

export default Ember.Helper.helper(activeTab);

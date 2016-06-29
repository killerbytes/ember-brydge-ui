import Ember from 'ember';

export function activeTab([key, active, classNames]/*, hash*/) {
	
  return key == active ? classNames+ ' is-active': classNames;
}

export default Ember.Helper.helper(activeTab);

import Ember from 'ember';
import InviteMixin from 'web/mixins/invite';

export default Ember.Component.extend(InviteMixin, {
	store: Ember.inject.service(),
});

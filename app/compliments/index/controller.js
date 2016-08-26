import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';
import FilteredComplimentsMixin from 'web/mixins/filtered-compliments';
import ProfileMixin from 'web/mixins/profile';
import IndustryMixin from 'web/mixins/industry';

export default Ember.Controller.extend(
  IndustryMixin,
  ProfileMixin,
	ComplimentTitlesMixin,
	FilteredComplimentsMixin, {
  compliment: Ember.inject.service(),
  // profile: Ember.computed.alias('model.profile'),
  toCompliments: Ember.computed.alias('model.toCompliments'),
	list: Ember.computed('complimentTitle', 'toCompliments', function(){
		var selected = this.get('complimentTitle');
		if(!selected || selected == 'All'){
			return this.get('toCompliments');
		}else{
			return this.get('toCompliments').filterBy('title', this.get('complimentTitle'));
		}
	}),
  isEmpty: Ember.computed('complimentContent', function(){
    return this.get('complimentContent') ? false : true;
  }),
  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted' ? true : false;
  }),


	complimentFilter: [],
  formComplimentTitle: Ember.computed(function(){
  	return this.get('titles.firstObject');
  }),

  actions: {
    submit(){
      var userid = this.get('model.profile.id')
      var title = this.get('formComplimentTitle');
      var content = this.get('complimentContent');
      this.get('compliment').post(userid, title, content)
      .then((res)=>{
        this.set('complimentContent', null);
        this.set('isClosed', true);
        this.set('formComplimentTitle', this.get('titles.firstObject'));
      })
    },
    onSelectTitle(selected){
      this.set('formComplimentTitle', selected);
    }
  }

});

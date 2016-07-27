import Ember from 'ember';
export default Ember.Component.extend({
	utils: Ember.inject.service(),
	typeYear: Ember.computed('type', function(){
		return this.get('type') ? true : false;
	}),
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  years: Ember.computed('',function(){
  	var years = [];
    var minYear = 1900;
  	var maxYear = this.get('maxYear') || moment().year() + 15;
  	while(maxYear > minYear){
  		years.push(maxYear--);
  	}
  	return years;
  }),
  month: Ember.computed('month', function(){
  	return moment(this.get('value')).month();
  }),
  year: Ember.computed('year', function(){
  	return moment(this.get('value')).year();
  }),
  actions: {
  	onChangeMonth(value){
			var date = moment.utc().set({year: this.get('year'), month: value, date:1}).format()
			this.set('value', date);
  	},
  	onChangeYear(value){
      var date = moment.utc().set({year:value, month: this.get('month'), date:1}).format()
			this.set('value', date);
  	}
  }
});

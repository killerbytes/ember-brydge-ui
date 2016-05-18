import Ember from 'ember';
export default Ember.Component.extend({
	typeYear: Ember.computed('type', function(){
		return this.get('type') ? true : false;
	}),
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  years: Ember.computed('',function(){
  	var years = [];
    var minYear = 1900;
  	var maxYear = this.get('maxYear') || moment().year();
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
  		var year = moment(this.get('value') || moment()).year();
			this.set('value', moment({month: value, year: year}).format())
  	},
  	onChangeYear(value){
      var i = this.get('value') || moment();
  		var month = moment(i).month();
			this.set('value', moment({month: month, year: value}))
  	}
  }
});

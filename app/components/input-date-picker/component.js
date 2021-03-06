import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
	classNames: ['date-picker', 'row', 'collapse', 'is-collapse-child'],
	format: "MM Do YYYY",
	init(){
		this._super(...arguments);
		if(!this.get('selected')) return false;
		var date = moment(this.get('selected'));
		if(!date) return false;
		this.setProperties({
			mm: date.month(),
			dd: date.date(),
			yy: date.year(),
		});
	},
	date: Ember.computed(function(){
		return moment();
	}),
	day: Ember.computed(function(){
		var day = _.range(1,32)
		day.unshift("Day");
		return day;
	}),
	month: Ember.computed(function(){
		var count = 0;
		var months = [];
		while (count < 12) months.push(moment().month(count++).format("MMMM"));
		months.unshift("Month");
		return months;
	}),
	year: Ember.computed(function(){
		var year = _.range(1905,moment().year()+1).reverse();
		year.unshift("Year")
		return year;
	}),

	_getDate: Ember.observer('mm','dd','yy', function() {
		// var date = new Date(this.get('yy'), this.get('mm'), this.get('dd'))
		// console.log(date)
		// var date = [date.getFullYear(), ('0' + date.getMonth()).slice(-2), ('0' + date.getDate()).slice(-2)].join('-');
		// console.log(date)
		// var date = moment([this.get('yy'), this.get('mm'), this.get('dd')], "YYYY-MM-DD", true);
		var date = moment([this.get('yy'), this.get('mm'), this.get('dd')]);
		if(date.isValid()){
			this.set('value', date.format());
		}else{
			this.set('value', null);
		}
  }),

	actions: {
		onSelectDay(d){
			this.set('dd', d);
		},
		onSelectMonth(m){
			this.set('mm', parseInt(m)-1);
		},
		onSelectYear(y){
			this.set('yy', y);
		},
	}
});

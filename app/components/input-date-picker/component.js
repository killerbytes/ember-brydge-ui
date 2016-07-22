import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['date-picker'],
	mm: null,
	dd: null,
	yy: null,
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
	_getDate(){
		var str = [this.get('mm'),this.get('dd'), this.get('yy')].join('-');
		var date = moment(str, "MMMM-D-YYYY", true);
		if(date.isValid()){
			return date;
		}
		return null;
	},
	actions: {
		onSelectDay(d){
			this.set('dd', d);
			this.set('value', this._getDate());
		},
		onSelectMonth(m){
			this.set('mm', m);
			this.set('value', this._getDate());
		},
		onSelectYear(y){
			this.set('yy', y);
			this.set('value', this._getDate());
		},
	}
});

import Ember from 'ember';

export default Ember.Mixin.create({
	currentCompany: null,
	jobTitle: null,

	setupController: function(controller, model) {
    let _this = this;
   	model.experiences.forEach(function(item){
	    console.log(item.get('company'), item.get('currentCompany'));
	    if(item.get('currentCompany')) {
	    	_this.set('currentCompany', item.get('company'));
	    	_this.set('jobTitle', item.get('title'));
	    }
	   });
   	model.company = this.get('currentCompany');
   	model.jobTitle = this.get('jobTitle');
    this._super(controller, model);
  }
});

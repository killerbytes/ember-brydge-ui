import Ember from 'ember';

export default Ember.Mixin.create({
	currentCompany: null,

	setupController: function(controller, model) {
    console.log('setupController from current company mixin <<<<');
    let _this = this;
   	model.experiences.forEach(function(item){
	    console.log(item.get('company'), item.get('currentCompany'));
	    if(item.get('currentCompany')) {
	    	_this.set('currentCompany', item.get('company'));
	    }
	   });
   	model.company = this.get('currentCompany');
    this._super(controller, model);
  }
});

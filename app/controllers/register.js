import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  queryParams: ['code'],
	form: Ember.computed(function(){
		
		return this.get('store').createRecord('register', {email: this.get('model.email')});
	}),

	actions: {
		request(){
			this.store.createRecord('invitation', {
				email: this.get('email')
			}).save()
				.then(res=>{
					this.transitionToRoute('thank-you');
				});
		},
		register(){
			this.get('form').save().then(res=>{
        this.get('session').authenticate('authenticator:oauth2', res.get('email'), res.get('password'))
          .then((user) => {
            const userid = this.get('session.data.authenticated.account_id');
            //const name = _this.get('session.data.authenticated.name');
            this.get('session').set('data.userid', userid);
            //_this.get('session').set('data.name', name);
            // cb();
            this.transitionToRoute('home');
          })
			});

		},
		onChecked(item){
			console.log(item)
		}
	}


});

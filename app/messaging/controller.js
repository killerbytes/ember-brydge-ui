import Ember from 'ember';

export default Ember.Controller.extend({
	// conversations: Ember.computed('model.@each','key', function(){		
		// let query = this.get('key');
		// let list = this.get('model').toArray();
		// _.filter(list, function(i){
			// this.get
		// })
		// console.log(list)
		// return this.get('model').filter(function(item, index, list){
		// 	var found = false;
		// 	var fields = ["name"];
		// 	var i = item;
		// 	console.log(i.get('name'))
		// 	// _.forEach(fields, function(key) {
		// 	// 	let i = item.get(key);
		// 	// 	if (i && i.toLowerCase().indexOf(query) >= 0 ? true : false) {
		// 	// 		found = true;
		// 	// 		return false;
		// 	// 	}
		// 	// })
		// 	return found;
		// });
	// })
	// conversations: Ember.computed.filter('model.[]', function(item){
 //    let defer = Ember.RSVP.defer();
 //    item.get('other').then(res => {
 //    	console.log(res.get('name'))
 //      // let filteredTopics = availableTopics.filter(topic => {
 //      //   return (
 //      //     topic.get('title') !== undefined &&
 //      //     this.get('selectedTopics') &&
 //      //     topic.get('title').match(exp) &&
 //      //     !this.get('selectedTopics').contains(topic)
 //      //   );
 //      // });
 //      defer.resolve({})

 //      // defer.resolve(filteredTopics.sortBy('title'));
 //    });
 //    var x = DS.PromiseArray.create({
 //      promise: defer.promise
 //    })
 //    console.log(x)
 //    return x;
 //    // return DS.PromiseArray.create({
 //    //   promise: defer.promise
 //    // });

 //  })

	// conversations: Ember.computed('model.@each.other', function (post) {
	// 	console.log(this.get('model'))
	// 	// var 
 //    return DS.PromiseArray.create({
 //      promise: this.get('authors').then(function(user) {
 //        return !user.get('male') && post.get('body.length') > 10000;
 //      })
 //    });
	// })
	// conversations: Ember.computed.filter('model.@each.other', function(item){
	// 	return DS.PromiseArray.create({
	// 		promise: item.get('other').then(function(item){
	// 			// return user.get('name') == 'Hein';
	// 			console.log(item)
	// 			return false;
	// 		})
	// 	})
	// })
});

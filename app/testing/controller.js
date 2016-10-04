import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
  // queryParams: ['industry'],
  // industry: [],
  // industryPicker: Ember.inject.service(),
  // favorites: Ember.computed.alias('model.favorites'),
  // selected: Ember.computed('favorites', function(){
  //   return _.map(this.get('favorites').toArray(), i=>{
  //     return i.get('code');
  //   })
  // }),
  // customPlayerVars: {
  //   autoplay: 1
  // },
  customPlayerVars: {
      autoplay: 1,
		height: 390,
		width: 640,
		showinfo: 1
	},

  actions: {
    // submit(item){
    //   console.log(item)
    //   // this.set('favorite', item)
    // }
  }

});

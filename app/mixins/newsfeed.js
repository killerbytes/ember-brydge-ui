import Ember from 'ember';


export default Ember.Mixin.create({
	isHTML: Ember.computed.notEmpty('post.html'),
  isImage: Ember.computed.notEmpty('post.image'),
  isMedia: Ember.computed('isHTML', 'isImage', function(){
    return !this.get('isHTML') && this.get('isImage')
  }),
  isText: Ember.computed.empty('post.image')
});

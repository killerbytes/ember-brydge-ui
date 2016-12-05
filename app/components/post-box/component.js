import Ember from 'ember';
import SharePostIndustryPicker from 'web/mixins/industry';
import { validator, buildValidations } from 'ember-cp-validations';
import _ from 'lodash/lodash';

const Validations = buildValidations({
  'postContent': [	validator('presence', true) ]
});

export default Ember.Component.extend(
  Validations,
  SharePostIndustryPicker, {
  sessionAccount: Ember.inject.service(),
  utils: Ember.inject.service(),
	classNames: ['post-box'],
  expanded: false,
  elem: Ember.computed(function(){
    return this.$();
  }),
  disabled: Ember.computed('postContent', function(){
    return this.get('postContent').length > 0;
  }),
  title: Ember.computed('site.title', function(){
    let title = this.get('site.title') || this.get('site.url');
    return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
  }),
  isDisabled: Ember.computed.empty('postContent'),
  crawl(uri){
    this.set('isLoading', true);
    this.get('utils').crawl(uri).then(res=>{
      this.set('isLoading', false);
      this.set('site', res);
    });
  },
	actions: {
    post(item, cb) {

      var url = this.get('utils').findUrls(this.get('postContent')).get(0)
      var content = this.get('postContent');
      if(this.get('site.title')){
        content = this._removeLink(this.get('postContent'), url);
      }
      content = content.trim();

      if(!content){
        cb.apply(this,[false]);
        $(`#dialog-box-post-${this.get('profile.id')}`).foundation('open');
        return false;
      }

      var data = {
        content: content,
        categories: _.map(this.get('categories'), 'id'),
        site: this.get('site')
      }

      this.sendAction('submit', data, ()=>{
        this._resetForm();
        cb.apply();
      })
      Ember.run.later(()=>{
        this.$('textarea').get(0).style.height = '';
      })
    },
    expand(){
      this.set('expanded', true);
    },
    collapse(){
      this.set('expanded', false);
    },
    cancel() {
      this.set('postContent', '');
    },
    edit(text, e){
      if(text){
        var el = e.currentTarget;
        var offset = (el.offsetHeight - el.clientHeight);
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = (e.currentTarget.scrollHeight+offset) + "px";
      }else{
        e.currentTarget.style.height = '';
      }

      if(this.get('site') || this.get('isNoPreview')) return false;
      switch(e.keyCode){
        case 91:
        case 32:
        case 224:
        case 229: //mobile
          var urls = this.get('utils').findUrls(text);
          if(urls.length){
            this.crawl(urls[0]);
          }
          break;
      }
    },
  }
});

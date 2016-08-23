import Ember from 'ember';
import SharePostIndustryPicker from 'web/mixins/share-post-industry-picker';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'email': [	validator('presence', true),
    					validator('format', { type: 'email' }) ]
});

export default Ember.Component.extend(SharePostIndustryPicker, {
  sessionAccount: Ember.inject.service(),
  ajaxApi: Ember.inject.service(),
  utils: Ember.inject.service(),
	classNames: ['post-box'],
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
  isIndustry: Ember.computed.or('profile.industryOneId', 'profile.industryTwoId', 'profile.industryThreeId'),
  _removeLink(content, link){
    return content.replace(link, "");
  },
  crawl(uri){
    this.set('isLoading', true);
    var url = "v2/crawl?url=" + uri;
    this.get('ajaxApi').request(url, {
      method: 'GET'
    }).then((res)=>{
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

      var data = {
        postContent: content.trim(),
        categories: _.map(this.get('categories'), 'id'),
        site: this.get('site')
      }
      this.sendAction('submit', data, ()=>{
        // this.toggle('up')
        this.setProperties({
          postContent: null, //textarea
          categories: [],
          site: null,
          industryOneId: false,
          industryTwoId: false,
          industryThreeId: false
        });
        cb.apply();
      })

      Ember.run.later(()=>{
        this.$('textarea').get(0).style.height = '';
      })

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
          var urls = this.get('utils').findUrls(text);
          if(urls.length){
            this.crawl(urls[0]);
          }
          break;
      }

    },
  }
});

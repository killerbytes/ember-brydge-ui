import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service(),
  ajaxApi: Ember.inject.service(),
  utils: Ember.inject.service(),
	classNames: ['share-post-box'],
  categories: [],
  title: Ember.computed('site.title', function(){
    let title = this.get('site.title') || this.get('site.url');
    return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
  }),
  isOccupational: Ember.computed('profile.occupationOneId', function(){
    return this.get('profile.occupationOneId') ? true : false && this.get('profile.occupationTwoId') ? true : false;
  }),
  init: function(){
    this._super(...arguments);
    this.set('categories', []);
  },
  crawl(uri){
    var url = "v2/crawl?url=" + uri;
    this.get('ajaxApi').request(url, {
      method: 'GET'
    }).then((res)=>{
      this.set('site', res);
    });
  },
  findUrls( text ){
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;
    // Regular expression to find FTP, HTTP(S) and email URLs.

    var regexToken = /(?:https?:\/\/)?(?:[\w]+\.)([a-zA-Z\.]{2,6})([\/\w\.-]*)*\/?/g;
    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null ){
        var token = matchArray[0];
        urlArray.push( token );
    }
    return urlArray;
  },
	actions: {
    toggle(){
      this.$('#channelPicker').foundation('toggle', this.$('.accordion-content'))
    },
    removePreview(){
      this.set('site.image', null);
    },
    removeObject(){
      this.set('site', null);
      this.set('isNoPreview', true);
    },
    post() {
      var url = this.findUrls(this.get('postContent'))
      if(this.get('site') && url){
        this.set('postContent', (this.get('postContent').replace(url[0], "")).trim() ) ;
      }

      var data = {
        postContent: this.get('postContent'),
        categories: _.map(this.get('categories'), 'id'),
        site: this.get('site')
      }

      this.sendAction('submit', data, ()=>{
        this.$('#channelPicker').foundation('toggle', this.$('.accordion-content'))
        this.setProperties({
          postContent: null,
          categories: [],
          site: null,
          isNoPreview: false,
          occupationOne: false,
          occupationTwo: false,
          industryId: false
        })
      })

      Ember.run.later(()=>{
        this.$('textarea').get(0).style.height = '';
      })

    },
    cancel() {
      this.set('postContent', '');
    },
    checkboxChanged(value, checked, text, e) {
      if(checked) {
        this.categories.pushObject({id: value, text: text, checked: checked});
        this.set(e.currentTarget.name, true)
      }else{
        var list = this.categories.toArray();
        _.remove(list, {id: value })
        this.set('categories', list);
        this.set(e.currentTarget.name, false)
      }
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
          var urls = this.findUrls(text);
          if(urls.length){
            this.crawl(urls[0]);
          }
          break;
      }

    },
  }
});

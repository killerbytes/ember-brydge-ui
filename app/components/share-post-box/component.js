import Ember from 'ember';
import SharePostIndustryPicker from 'web/mixins/share-post-industry-picker';

export default Ember.Component.extend(SharePostIndustryPicker, {
  sessionAccount: Ember.inject.service(),
  ajaxApi: Ember.inject.service(),
  utils: Ember.inject.service(),
	classNames: ['share-post-box'],
  elem: Ember.computed(function(){
    return this.$();
  }),
  title: Ember.computed('site.title', function(){
    let title = this.get('site.title') || this.get('site.url');
    return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
  }),
  isOccupational: Ember.computed('profile.industryTwoId', function(){
    return this.get('profile.industryTwoId') ? true : false && this.get('profile.industryThreeId') ? true : false;
  }),
  crawl(uri){
    console.log(uri)
    var url = "v2/crawl?url=" + uri;
    this.get('ajaxApi').request(url, {
      method: 'GET'
    }).then((res)=>{
      this.set('site', res);
    });
  },
  findUrls( text ){
    console.log(text)
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
    post() {
      var url = this.findUrls(this.get('postContent'))
      if(this.get('site.title') && url){
        this.set('postContent', (this.get('postContent').replace(url[0], "")).trim() ) ;
      }

      var data = {
        postContent: this.get('postContent'),
        categories: _.map(this.get('categories'), 'id'),
        site: this.get('site')
      }

      this.sendAction('submit', data, ()=>{
        this.toggle('up')
        this.setProperties({
          postContent: null, //textarea
          categories: [],
          site: null,
          // isNoPreview: false,
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

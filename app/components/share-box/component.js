import Ember from 'ember';

export default Ember.Component.extend({
  ajaxApi: Ember.inject.service(),
  utils: Ember.inject.service(),
	classNames: ['share-box', 'mb'],
  categories: [],
  isOccupational: Ember.computed('profile.occupationOneId', function(){
    return this.get('profile.occupationOneId') ? true : false && this.get('profile.occupationTwoId') ? true : false;
  }),
  didInsertElement: function(){
    this.set('categories', [])
  },
  crawl(uri){
    var url = "v1/crawl?url=" + uri;
    this.get('ajaxApi').request(url, {
      method: 'GET'
    }).then((res)=>{
      console.log(res);
      this.set('site', res);
    });
  },

  // postContent: "http://www.viralthread.com/mcdonalds-is-changing-the-recipe-of-nuggets/",
	actions: {
    removePreview(){
      console.log('removePreview');
      this.set('noPreview', true);
    },
    post() {
      var data = {
        postContent: this.get('postContent'),
        noPreview: this.get('noPreview') || false,
        categories: _.map(this.get('categories'), 'id'),
        site: this.get('site')
      }
      console.log(data)
      return false;
      this.sendAction('submit', 
        this.get('postContent'), 
        _.map(this.get('categories'), 'id'), 
        this.get('site'), ()=>{
          this.setProperties({
            postContent: null,
            site: null
          });        
        });
    },
    cancel() {
      this.set('postContent', '');
    },
    checkboxChanged(value, checked, text) {
      if(checked) {
        this.categories.pushObject({id: value, text: text});
      }else{
        var list = this.categories.toArray();
        _.remove(list, {id: value })
        this.set('categories', list);
      }
    },
    edit(text, e){
      if(this.get('site')) return false;
      switch(e.keyCode){
        case 91:
        case 32:
        case 224:
          var urls = findUrls(text);
          if(urls.length){
            this.crawl(urls[0]);
          }
          break;
      }
      function findUrls( text ){
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
      }

    },
  }
});

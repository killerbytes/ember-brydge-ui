import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    //return {data:[{type:'message', id:"xxx1", attributes:{title:"Test", content:"This is message test"}}]}
    return $.getJSON("http://www.reddit.com/r/AskReddit/.json?jsonp=?");
    // .then((data)=>{
    //   console.log(data);
    // });
  }

});

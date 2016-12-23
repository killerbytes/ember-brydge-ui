import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  utils: Ember.inject.service(),
  classNames: ['brydge-mention'],
  _htmlSafe(url){
    return `'background-image': 'url(${url})'`;
  },
  _initMention(data){

    let _this = this;

    $.widget("ui.editablecomplete", $.ui.editablecomplete, {
      _renderItem: function(ul, item) {
        var anchor, li, value;
        li = $('<li>');
        anchor = $('<a>').appendTo(li);
        value = item.value.replace(this.searchTerm.substring(), "<strong>$&</strong>");
        anchor.append(`
          <div class="avatar float-left" style='background-image: url(${item.avatar_url})'>
            <img src="${item.avatar_url}" class="hide">
          </div>
          <div class="user-info">
            <div class="name">${value}</div>
            <div class="position">${item.career}</div>
          </div>
          `);

        return li.appendTo(ul);
      }
    })

    window.editor = this.$('#editor').mentionsInput({
      source: 'users.json',
      autocomplete: {classes: {"ui-autocomplete": "brydge-mention-menu media-list"}}
    })


  },
  _loadContacts(){
    this.get('store').query('contact', {userid: this.get('session.data.authenticated.user_id')}).then(res=>{
      this._initMention(res)
    })
  },
  didInsertElement(){
    // this.startMention(this.$().get(0));
    this._loadContacts();
		this._super(...arguments);
	},
  actions: {
    show(){
      console.log(this.$('#editor').mentionsInput('getMentions'))
    }
  }
});

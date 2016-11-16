import Ember from 'ember';

export default Ember.Helper.helper(function([item]){
	function getContent(content){
		return  content && content.length > 80 ? content.substr(0, 80) + ' ...' : content;
	}
	var text;
	switch(item.get('type')){
		case 'accept':
			text = "accepted your connection request";
			break;
		case 'ask':
			text = "asked you a question";
			break;
		case 'answer':
			text = "answered your question";
			break;
		case 'compliment':
		 	text = "complimented you";
			break;
		case 'comment':
			text = "commented on " +  '<strong>' + getContent(item.get('content')) + '</strong>';
			break;
		case 'reply-comment':
			text = "replied to your comment on " +  '<strong>' + getContent(item.get('content')) + '</strong>';
			break;
		case 'follow':
			text = "followed you";
			break;
		case 'inbox':
			text = "is the community manager at Brydge. He has a few questions for you. Want to answer and add them to your profile?";
			break;
		case 'share':
			text = "shared " + '<strong>' + getContent(item.get('content')) + '</strong>';;
			break;
		case 'vote':
			text = "upvoted "  + '<strong>' + getContent(item.get('content')) + '</strong>';;
			break;
	}
  return text;
});

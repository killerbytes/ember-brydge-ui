import Ember from 'ember';

export default Ember.Helper.helper(([date])=>{
  var today = moment(new Date());
  var date = moment(date);
  var dd = today.diff(date, 'seconds')
  switch(true){
    case dd < 60: // < 60 seconds
      return 'Just now';
      break;
    case dd < 3600: // < 60 minutes
      var i = Math.floor(dd/60);
      return  i > 1 ? i + ' mins ago' : i + ' min ago';
      break;
    case dd < 86400: // < 24 hours
      var i = Math.floor(dd/60/60);
      return  i > 1 ? i + ' hrs ago' : i + ' hr ago';
      break;
    case dd < 172800: // < 48 hours
      return  'Yesterday at ' + date.format("h:mma");
      break;
    default:
      if(today.year() == date.year()){
        return  date.format("MMM D");
      }else{
        return  date.format("MMM D, YYYY");
      }
      break;
  }
});

// Call Time Method
setInterval(function (){
  Meteor.call("getServerTime", function (error, result){
    Session.set("time", result);
  });
}, 500);


// Get Time
Template.home.helpers({
  time: function(){
    return Session.get("time");
  }
})

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMMM Do, YYYY [at] hh:mm a');
});

Template.registerHelper('formatDateMain', function(date) {
  return moment(date).format('MMMM Do, YYYY [at] hh:mm:ss a');
});
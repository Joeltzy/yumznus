// Call Time Method
setInterval(function (){
  Meteor.call("getServerTime", function (error, result){
    Session.set("time", result);
  });
}, 1000);


// Get Time
Template.home.helpers({
  time: function(){
    return Session.get("time");
  }
})
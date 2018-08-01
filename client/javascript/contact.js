Template.contact.events({
  'submit form': function(event){
      event.preventDefault();
      var username = event.target.username.value;
      var email = event.target.email.value;
      var bot1st = event.target.bot1st.value;
      var botcheck = event.target.botcheck.value;
      if (bot1st != botcheck) {
        alert("Verification Code incorrect. Please enter the correct code!");
      }

      else if (!Match.test(email, ValidEmail)) {
        alert("Please enter a Valid Email.");
      }

      else {
        alert("Response sent. Expect a reply from us within 3 working days. Thank you and have a great day!");
        window.location.href = '/';
      }

  }
});

Template.contact.helpers({
  makeid: function () {
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
  }
});
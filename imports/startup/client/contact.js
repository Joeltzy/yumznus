var count = 5;

Template.contact.events({
  'submit form': function(event){
      event.preventDefault();

      var username = event.target.username.value;
      var email = event.target.email.value;
      var bot1st = event.target.bot1st.value;
      var botcheck = event.target.botcheck.value;
      if (bot1st != botcheck) {
        count -= 1;
        if (count >= 3) {
          alert("Verification Code incorrect. " + count + " tries left.");
        }
        else if (count == 2) {
          alert(count + " tries left. No Brute Force please.");
        }
        else if (count == 1) {
          alert("Hello Intelligent Bot. You have " + count + " try left!");
        }
        else if (count <= 0) {
          alert("Sorry, you failed the Verification Test. Page will reload with a new code.")
          location.reload();
        }
        
      }

      else if (!Match.test(email, ValidEmail)) {
        alert("Please enter a Valid Email.");
      }

      else {
        alert("Thank you " + username + ". Expect a reply from us at " + email + " within 3 working days. Have a great day!");

        window.location.href = '/';
      }
  }
});


Template.contact.helpers({
  makeid: function () {
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
  }
});



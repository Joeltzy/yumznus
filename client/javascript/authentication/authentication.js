Template.register.events({
  'submit form': function(event){
      event.preventDefault();
      username = event.target.username.value;
      var email = event.target.email.value;
      var password = event.target.password.value;
      var confirmpassword = event.target.confirmpassword.value;

      if (password != confirmpassword) {
        alert("Passwords do not match!");
      } else if (!Match.test(email, ValidEmail)) {
        alert("Please enter a Valid Email.");
      } else {
        Accounts.createUser({
          username: username,
          email: email,
          password: confirmpassword
        });
        Meteor.logout();
        alert("Account Created. Please log in.");

        window.location.href = '/L0xvZ2luIHBhZ2U=';
      }
  }
});
  

Template.login.events({
  'submit form': function(event){
      event.preventDefault();
      var username = event.target.username.value;
      var email = event.target.email.value;
      var password = event.target.password.value;
      Meteor.loginWithPassword(email, password, function(error){
        if (Meteor.user()) {
          alert("Hello " + username + ", you are now logged in!");
          window.location.href = '/';
        } else {
          alert(error.reason);
        }
      });
  }
});

Template.signout.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      alert("You have successfully logged out.")

  }
});

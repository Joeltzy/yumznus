Router.route(btoa(encodeURIComponent('/register page').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
  template: 'register',
  name: 'register'
});


Router.route(btoa(encodeURIComponent('/vote list').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
  template: 'vote_list',
  name: 'vote_list'
});


Router.route(btoa(encodeURIComponent('/recommended page').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
  template: 'recommended',
  name: 'recommended'
});


Router.route('/', {
  template: 'home',
  name: 'home'
});


Router.route(btoa(encodeURIComponent('/sign out').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
  template: 'signout',
  name: 'signout'
});


Router.route(btoa(encodeURIComponent('/Login page').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
  template: 'login',  
  name: 'login'
});


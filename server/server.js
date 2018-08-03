
if (Meteor.isServer) {
Meteor.methods({
	getServerTime: function() {
		// var _time = (new Date).toTimeString().replace(/:\d\d .*/, '');
		//var _time = (new Date).toTimeString().substring(0,8);
		var _time = (new Date).toLocaleString('en-US', { timeZone: 'Asia/Singapore' });
		return _time;

	}
});



}
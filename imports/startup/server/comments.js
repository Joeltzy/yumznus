//----------{FineFoodComment}--------------
Meteor.methods({
	FFinsert: function(post) {
		var FFId = FFrevs.insert({
			post : post,
			score : 0,
			submitted : new Date(),
		});
	},

	ffcommentInsert: function(comment) {
		FFcomments.insert(comment);
	},

	// ffrevinsert: function(post) {
	// 	FFrevs.insert(post);
	// },

	// ffrevfindone: function() {
	// 	FFrevs.findOne({
	// 		_id: this._id
	// 	});
	// },

	// 'ffrevfind': function() {
	// 	FFrevs.find({}, {
	// 		sort: {
	// 		  score: -1
	// 		}
	// 	});
	// }
});
//-----------------------------------------


//----------{FoodClique Method}------------
Meteor.methods({
	FCinsert: function(post) {
		var FCId = FCrevs.insert({
			post : post,
			score : 0,
			submitted : new Date(),
		});
	},

	fccommentInsert: function(comment) {
		FCcomments.insert(comment);
	}
});
//-----------------------------------------


//----------{TeaParty Method}--------------
Meteor.methods({
	TPinsert: function(post) {
		var TPId = TPrevs.insert({
			post : post,
			score : 0,
			submitted : new Date(),
		});
	},

	tpcommentInsert: function(comment) {
		TPcomments.insert(comment);
	}
});
//-----------------------------------------


//----------{Deck Method}------------------
Meteor.methods({
	DECKinsert: function(post) {
		var DECKId = DECKrevs.insert({
			post : post,
			score : 0,
			submitted : new Date(),
		});
	},

	deckcommentInsert: function(comment) {
		DECKcomments.insert(comment);
	}
});
//-----------------------------------------


//----------{Frontier Method}---------------
Meteor.methods({
	FRinsert: function(post) {
		var FRId = FRrevs.insert({
			post : post,
			score : 0,
			submitted : new Date(),
		});
	},

	frcommentInsert: function(comment) {
		FRcomments.insert(comment);
	}
});
//------------------------------------------


//----------{FOS Aircon Method}-------------
Meteor.methods({
	ACinsert: function(post) {
		var ACId = ACrevs.insert({
			post : post,
			score : 0,
			submitted : new Date(),
		});
	},

	accommentInsert: function(comment) {
		ACcomments.insert(comment);
	}
});
//------------------------------------------
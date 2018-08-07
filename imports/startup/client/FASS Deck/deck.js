// -------------{ROUTES}-------------------
Router.route('/deckrev/:_id', {
	name: 'deckPage',
	data: function() {
		return DECKrevs.findOne(this.params._id);
	}
});

Router.route(btoa(encodeURIComponent('/deckList').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
	template: 'deckList',
  name: 'deckList'
});

Router.route(btoa(encodeURIComponent('/deckSubmit').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
	template: 'deckSubmit',
  name: 'deckSubmit'
});
//------------------------------------------

//-----------{Template Functions}-----------
Template.deckList.helpers({
  deckrev: function() {
    return DECKrevs.find({}, {
      sort: {
        score: -1
      }
    });
  }
})

Template.deckcommentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id,
      submitted: new Date()
    };
    console.log(comment['date'])
    var commentBody = e.target.body.value;
    // Check if the comment is not empty
    if (commentBody == "") {
    } else {
      Meteor.call('deckcommentInsert', comment);
    }

    // clear field
    e.target.body.value = "";
  }
});

Template.deckItem.events({
  'click': function() {
    Session.set('selected_post', this._id);
  },

  'click a.yes': function() {
    if (Meteor.user()) {
      var postId = DECKrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        DECKrevs.update(selected_post_Id, {
          $inc: {
            'score': 1
          }
        });
        DECKrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
      }
    }
  },

  'click a.no': function() {
    if (Meteor.user()) {
      var postId = DECKrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        DECKrevs.update(selected_post_Id, {
          $inc: {
            'score': -1
          }
        });
        DECKrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
        if (postId.score <= -3) {
          console.log('delete');
          DECKrevs.remove({
            _id: this._id
          })
        }
      }
    }
  }
});

Template.deckItem.helpers({
  commentsCount: function() {
    return DECKcomments.find({
      postId: this._id
    }).count();
  }
});

Template.deckPage.helpers({
  deckcomments: function() {
    return DECKcomments.find({
      postId: this._id
    });
  }
});

Template.deckSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      postTitle: $(e.target).find('[name=postTitle]').val(),
      post: $(e.target).find('[name=post]').val(),
      submitted: new Date()
    };

    post._id = DECKrevs.insert(post);
    Router.go('deckList', post);
  }
});
//-----------------------------------------
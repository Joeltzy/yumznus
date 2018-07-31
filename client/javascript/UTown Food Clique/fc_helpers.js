
// -------------{ROUTES}-------------------
Router.route('/fcrev/:_id', {
	name: 'fcPage',
	data: function() {
		return FCrevs.findOne(this.params._id);
	}
});

Router.route(btoa(encodeURIComponent('/fcList').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
	template: 'fcList',
  name: 'fcList'
});

Router.route(btoa(encodeURIComponent('/fcSubmit').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
	template: 'fcSubmit',
  name: 'fcSubmit'
});
//------------------------------------------

//-----------{Template Functions}-----------
Template.fcList.helpers({
  fcrev: function() {
    return FCrevs.find({}, {
      sort: {
        score: -1
      }
    });
  }
})

Template.fccommentSubmit.events({
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
      Meteor.call('fccommentInsert', comment);
    }

    // clear field
    e.target.body.value = "";
  }
});

Template.fcItem.events({
  'click': function() {
    Session.set('selected_post', this._id);
  },

  'click a.yes': function() {
    if (Meteor.user()) {
      var postId = FCrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        FCrevs.update(selected_post_Id, {
          $inc: {
            'score': 1
          }
        });
        FCrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
      }
    }
  },

  'click a.no': function() {
    if (Meteor.user()) {
      var postId = FCrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        FCrevs.update(selected_post_Id, {
          $inc: {
            'score': -1
          }
        });
        FCrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
        if (postId.score <= -3) {
          console.log('delete');
          FCrevs.remove({
            _id: this._id
          })
        }
      }
    }
  }
});

Template.fcItem.helpers({
  commentsCount: function() {
    return FCcomments.find({
      postId: this._id
    }).count();
  }
});

Template.fcPage.helpers({
  fccomments: function() {
    return FCcomments.find({
      postId: this._id
    });
  }
});

Template.fcSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      postTitle: $(e.target).find('[name=postTitle]').val(),
      post: $(e.target).find('[name=post]').val(),
      submitted: new Date()
    };

    post._id = FCrevs.insert(post);
    Router.go('fcList', post);
  }
});
//-----------------------------------------
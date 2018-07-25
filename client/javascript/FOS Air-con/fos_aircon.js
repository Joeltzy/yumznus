// -------------{ROUTES}-------------------
Router.route('/acrev/:_id', {
	name: 'acPage',
	data: function() {
		return ACrevs.findOne(this.params._id);
	}
});

Router.route('/acList', {
	template: 'acList'
});

Router.route('/acSubmit', {
	template: 'acSubmit'
});
//------------------------------------------

//-----------{Template Functions}-----------
Template.acList.helpers({
  acrev: function() {
    return ACrevs.find({}, {
      sort: {
        score: -1
      }
    });
  }
})

Template.accommentSubmit.events({
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
      Meteor.call('accommentInsert', comment);
    }

    // clear field
    e.target.body.value = "";
  }
});

Template.acItem.events({
  'click': function() {
    Session.set('selected_post', this._id);
  },

  'click a.yes': function() {
    if (Meteor.user()) {
      var postId = ACrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        ACrevs.update(selected_post_Id, {
          $inc: {
            'score': 1
          }
        });
        ACrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
      }
    }
  },

  'click a.no': function() {
    if (Meteor.user()) {
      var postId = ACrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        ACrevs.update(selected_post_Id, {
          $inc: {
            'score': -1
          }
        });
        ACrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
        if (postId.score <= -3) {
          console.log('delete');
          ACrevs.remove({
            _id: this._id
          })
        }
      }
    }
  }
});

Template.acItem.helpers({
  commentsCount: function() {
    return ACcomments.find({
      postId: this._id
    }).count();
  }
});

Template.acPage.helpers({
  accomments: function() {
    return ACcomments.find({
      postId: this._id
    });
  }
});

Template.acSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      postTitle: $(e.target).find('[name=postTitle]').val(),
      post: $(e.target).find('[name=post]').val(),
      submitted: new Date()
    };

    post._id = ACrevs.insert(post);
    Router.go('acList', post);
  }
});
//-----------------------------------------
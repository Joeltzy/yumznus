// -------------{ROUTES}-------------------
Router.route('/frrev/:_id', {
	name: 'frPage',
	data: function() {
		return FRrevs.findOne(this.params._id);
	}
});

Router.route(btoa(encodeURIComponent('/frList')).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }), {
	template: 'frList',
  name: 'frList'
});

Router.route(btoa(encodeURIComponent('/frSubmit')).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }), {
	template: 'frSubmit',
  name: 'frSubmit'
});
//------------------------------------------

//-----------{Template Functions}-----------
Template.frList.helpers({
  frrev: function() {
    return FRrevs.find({}, {
      sort: {
        score: -1
      }
    });
  }
})

Template.frcommentSubmit.events({
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
      Meteor.call('frcommentInsert', comment);
    }

    // clear field
    e.target.body.value = "";
  }
});

Template.frItem.events({
  'click': function() {
    Session.set('selected_post', this._id);
  },

  'click a.yes': function() {
    if (Meteor.user()) {
      var postId = FRrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        FRrevs.update(selected_post_Id, {
          $inc: {
            'score': 1
          }
        });
        FRrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
      }
    }
  },

  'click a.no': function() {
    if (Meteor.user()) {
      var postId = FRrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        FRrevs.update(selected_post_Id, {
          $inc: {
            'score': -1
          }
        });
        FRrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
        if (postId.score <= -3) {
          console.log('delete');
          FRrevs.remove({
            _id: this._id
          })
        }
      }
    }
  }
});

Template.frItem.helpers({
  commentsCount: function() {
    return FRcomments.find({
      postId: this._id
    }).count();
  }
});

Template.frPage.helpers({
  frcomments: function() {
    return FRcomments.find({
      postId: this._id
    });
  }
});

Template.frSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      postTitle: $(e.target).find('[name=postTitle]').val(),
      post: $(e.target).find('[name=post]').val(),
      submitted: new Date()
    };

    post._id = FRrevs.insert(post);
    Router.go('frList', post);
  }
});
//-----------------------------------------
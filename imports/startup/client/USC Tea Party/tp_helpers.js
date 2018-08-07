// -------------{ROUTES}-------------------
Router.route('/tprev/:_id', {
	name: 'tpPage',
	data: function() {
		return TPrevs.findOne(this.params._id);
	}
});

Router.route(btoa(encodeURIComponent('/tpList').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
	template: 'tpList',
  name: 'tpList'
});

Router.route(btoa(encodeURIComponent('/tpSubmit').replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    })), {
	template: 'tpSubmit',
  name: 'tpSubmit'
});
//------------------------------------------

//-----------{Template Functions}-----------
Template.tpList.helpers({
  tprev: function() {
    return TPrevs.find({}, {
      sort: {
        score: -1
      }
    });
  }
})

Template.tpcommentSubmit.events({
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
      Meteor.call('tpcommentInsert', comment);
    }

    // clear field
    e.target.body.value = "";
  }
});

Template.tpItem.events({
  'click': function() {
    Session.set('selected_post', this._id);
  },

  'click a.yes': function() {
    if (Meteor.user()) {
      var postId = TPrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        TPrevs.update(selected_post_Id, {
          $inc: {
            'score': 1
          }
        });
        TPrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
      }
    }
  },

  'click a.no': function() {
    if (Meteor.user()) {
      var postId = TPrevs.findOne({
        _id: this._id
      })
      if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
        alert('You have already voted!');
      } else {
        var selected_post_Id = Session.get('selected_post');
        TPrevs.update(selected_post_Id, {
          $inc: {
            'score': -1
          }
        });
        TPrevs.update(selected_post_Id, {
          $addToSet: {
            voted: Meteor.userId()
          }
        });
        if (postId.score <= -3) {
          console.log('delete');
          TPrevs.remove({
            _id: this._id
          })
        }
      }
    }
  }
});

Template.tpItem.helpers({
  commentsCount: function() {
    return TPcomments.find({
      postId: this._id
    }).count();
  }
});

Template.tpPage.helpers({
  tpcomments: function() {
    return TPcomments.find({
      postId: this._id
    });
  }
});

Template.tpSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      postTitle: $(e.target).find('[name=postTitle]').val(),
      post: $(e.target).find('[name=post]').val(),
      submitted: new Date()
    };

    post._id = TPrevs.insert(post);
    Router.go('tpList', post);
  }
});
//-----------------------------------------
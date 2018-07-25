
// -------------{ROUTES}-------------------
Router.route('/ffrev/:_id', {
  name: 'ffPage',
  data: function() {
    return FFrevs.findOne(this.params._id);
  }
});

Router.route('/ffList', {
  template: 'ffList'
});

Router.route('/ffSubmit', {
  template: 'ffSubmit'
});
//------------------------------------------

//-----------{Template Functions}-----------
Template.ffList.helpers({
ffrev: function() {
return FFrevs.find({}, {
sort: {
score: -1
}
});
}
})

Template.ffcommentSubmit.events({
'submit form': function(e, template) {
e.preventDefault();
var $body = $(e.target).find('[name=body]');
var comment = {
body: $body.val(),
postId: template.data._id,
submitted: new Date()
};
var commentBody = e.target.body.value;
// Check if the comment is not empty
if (commentBody == "") {
} else {
Meteor.call('ffcommentInsert', comment);
}
// clear field
e.target.body.value = "";
}
});

Template.ffItem.events({
'click': function() {
Session.set('selected_post', this._id);
},

'click a.yes': function() {
if (Meteor.user()) {
var postId = FFrevs.findOne({
_id: this._id
})
if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
alert('You have already voted!');
} else {
var selected_post_Id = Session.get('selected_post');
FFrevs.update(selected_post_Id, {
$inc: {
'score': 1
}
});
FFrevs.update(selected_post_Id, {
$addToSet: {
voted: Meteor.userId()
}
});
}
}
},

'click a.no': function() {
if (Meteor.user()) {
var postId = FFrevs.findOne({
_id: this._id
})
if ($.inArray(Meteor.userId(), postId.voted) !== -1) {
alert('You have already voted!');
} else {
var selected_post_Id = Session.get('selected_post');
FFrevs.update(selected_post_Id, {
$inc: {
'score': -1
}
});
FFrevs.update(selected_post_Id, {
$addToSet: {
voted: Meteor.userId()
}
});

}
}
}
});

Template.ffItem.helpers({
commentsCount: function() {
return FFcomments.find({
postId: this._id
}).count();
}
});

Template.ffPage.helpers({
ffcomments: function() {
return FFcomments.find({
postId: this._id
});
}
});

Template.ffSubmit.events({
'submit form': function(e) {
e.preventDefault();
var post = {
postTitle: $(e.target).find('[name=postTitle]').val(),
post: $(e.target).find('[name=post]').val(),
submitted: new Date()
};

// post._id = FFrevs.insert(post);
post._id = FFrevs.insert(post);
Router.go('ffList', post);
}
});
//-----------------------------------------
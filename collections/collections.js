// List of food items for Users to Vote
Votes = new Mongo.Collection("votes");

// List of top 4 food items to be outputed
Recommends = new Mongo.Collection("recommends");

//----Review Collections for Fine Food----
FFrevs = new Meteor.Collection('ffrevs');
FFcomments = new Mongo.Collection("ffcomments");
//----------------------------------------

//----Review Collections for Food Clique----
FCrevs = new Meteor.Collection('fcrevs');
FCcomments = new Mongo.Collection("fccomments");
//------------------------------------------

//----Review Collections for Tea Party----
TPrevs = new Meteor.Collection('tprevs');
TPcomments = new Mongo.Collection("tpcomments");
//----------------------------------------

//----Review Collections for The Deck-----
DECKrevs = new Meteor.Collection('deckrevs');
DECKcomments = new Mongo.Collection("deckcomments");
//----------------------------------------

//----Review Collections for FOS Frontier----
FRrevs = new Meteor.Collection('frrevs');
FRcomments = new Mongo.Collection("frcomments");
//-------------------------------------------

//----Review Collections for FOS Air-con-----
ACrevs = new Meteor.Collection('acrevs');
ACcomments = new Mongo.Collection("accomments");
//-------------------------------------------
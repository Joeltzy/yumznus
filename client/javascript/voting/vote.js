// Function to Sort Numbers in Javascript
function sortNumber(a, b) {
    return a - b;
}

function getSum(total, num) {
    return total + num;
}

// Function to output top 4 food items
Template.recommended.helpers({
        items: function() {
            var vote_list = Votes.find().fetch();
            var i;
            var arr = new Array();
            var actual = new Array();
            var final = new Array();
            for (i = 0; i < Votes.find().count(); i++) {
                // if percentage <= 0, do not add into array
                if (vote_list[i].percen > 0) {
                    arr.push(vote_list[i].percen);
                    arr = arr.sort(sortNumber).reverse();
                }
            }
            // i = 4 because top 4 food items
            for (i = 0; i < 4; i++) {
                actual.push(arr[i]);
            }
            for (i = 0; i < 4; i++) {
                final.push(Votes.find({
                    percen: actual[i]
                }).fetch()[0]);

            }
            return final;
        }
    })


// Function to Sort food stalls in Alphabetical Order
Template.vote_list.helpers({
// Find Votes
        votes: function() {
            return Votes.find();
        },



// University Town Find Food
        sortff: function() {
            var sorting_list = Votes.find().fetch();
            var i;
            var arr = new Array();
            var actual = new Array();
            for (i = 0; i < Votes.find().count(); i++) {
                if (sorting_list[i]['location'] == 'University Town Fine Food') {
                    arr.push(sorting_list[i].title);
                }
            }
            arr.sort();
            for (i = 0; i < arr.length; i++) {
                actual.push(Votes.find({
                    title: arr[i]
                }).fetch()[0]);
            }
            return actual;
        },

// University Town Food Clique
        sortfc: function() {
            var sorting_list = Votes.find().fetch();
            var i;
            var arr = new Array();
            var actual = new Array();
            for (i = 0; i < Votes.find().count(); i++) {
                if (sorting_list[i]['location'] == 'University Town Food Clique') {
                    arr.push(sorting_list[i].title);
                }
            }
            arr.sort();
            for (i = 0; i < arr.length; i++) {
                actual.push(Votes.find({
                    title: arr[i]
                }).fetch()[0]);
            }
            return actual;
        },

//Faculty of Arts & Social Science (The Deck)
        sortdeck: function() {
            var sorting_list = Votes.find().fetch();
            var i;
            var arr = new Array();
            var actual = new Array();
            for (i = 0; i < Votes.find().count(); i++) {
                if (sorting_list[i]['location'] == 'Faculty of Arts & Social Science - The Deck') {
                    arr.push(sorting_list[i].title);
                }
            }
            arr.sort();
            for (i = 0; i < arr.length; i++) {
                actual.push(Votes.find({
                    title: arr[i]
                }).fetch()[0]);
            }
            return actual;
        },

//Faculty of Science (Air-con)
        sortfosaircon: function() {
            var sorting_list = Votes.find().fetch();
            var i;
            var arr = new Array();
            var actual = new Array();
            for (i = 0; i < Votes.find().count(); i++) {
                if (sorting_list[i]['location'] == 'Faculty of Science (Air-con)') {
                    arr.push(sorting_list[i].title);
                }
            }
            arr.sort();
            for (i = 0; i < arr.length; i++) {
                actual.push(Votes.find({
                    title: arr[i]
                }).fetch()[0]);
            }
            return actual;
        },

//Faculty of Science (Air-con)
        sortfosfrontier: function() {
            var sorting_list = Votes.find().fetch();
            var i;
            var arr = new Array();
            var actual = new Array();
            for (i = 0; i < Votes.find().count(); i++) {
                if (sorting_list[i]['location'] == 'Faculty of Science - Frontier') {
                    arr.push(sorting_list[i].title);
                }
            }
            arr.sort();
            for (i = 0; i < arr.length; i++) {
                actual.push(Votes.find({
                    title: arr[i]
                }).fetch()[0]);
            }
            return actual;
        },

        ff_count: function() {
            var arr = new Array();
            var count_list = Votes.find().fetch();
            for (i = 0; i < Votes.find().count(); i++) {
                if (count_list[i].location == "University Town Fine Food") {
                    arr.push(count_list[i].count);
                }
            }
            return arr.reduce(getSum);
        },

        fc_count: function() {
            var arr = new Array();
            var count_list = Votes.find().fetch();
            for (i = 0; i < Votes.find().count(); i++) {
                if (count_list[i].location == "University Town Food Clique") {
                    arr.push(count_list[i].count);
                }
            }
            return arr.reduce(getSum);
        },

        ac_count: function() {
            var arr = new Array();
            var count_list = Votes.find().fetch();
            for (i = 0; i < Votes.find().count(); i++) {
                if (count_list[i].location == "Faculty of Science (Air-con)") {
                    arr.push(count_list[i].count);
                }
            }
            return arr.reduce(getSum);
        },

        frontier_count: function() {
            var arr = new Array();
            var count_list = Votes.find().fetch();
            for (i = 0; i < Votes.find().count(); i++) {
                if (count_list[i].location == "Faculty of Science - Frontier") {
                    arr.push(count_list[i].count);
                }
            }
            return arr.reduce(getSum);
        },

        deck_count: function() {
            var arr = new Array();
            var count_list = Votes.find().fetch();
            for (i = 0; i < Votes.find().count(); i++) {
                if (count_list[i].location == "Faculty of Arts & Social Science - The Deck") {
                    arr.push(count_list[i].count);
                }
            }
            return arr.reduce(getSum);
        },

        total_count: function() {
            var arr = new Array();
            var count_list = Votes.find().fetch();
            console.log(count_list[16].location);
            for (i = 0; i < Votes.find().count(); i++) {
                arr.push(count_list[i].count);
            }
            
            return arr.reduce(getSum);
        }, 
    })


// Function for Upvote/Downvote of Food Canteens
Template.vote_item.events({
    "click .js-one": function(event) {
        var vote_id = this._id;

        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star1: this.star1 + 1,
                count: this.count + 1,
            }
        });
        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star_sum: Math.round(((this.star1 + 1) * 1 + (this.star2) * 2 + (this.star3) * 3 + (this.star4) * 4 + (this.star5) * 5) / (this.count + 1) * 10)/ 10,
                percen: (((this.star1 + 1) * 1 + (this.star2) * 2 + (this.star3) * 3 + (this.star4) * 4 + (this.star5) * 5) / (this.count + 1)) * 20,
                createdOn: new Date()
            }
        });
        return false;
    },
    "click .js-two": function(event) {
        var vote_id = this._id;

        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star2: this.star2 + 1,
                count: this.count + 1,
            }
        });
        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star_sum: Math.round(((this.star1) * 1 + (this.star2 + 1) * 2 + (this.star3) * 3 + (this.star4) * 4 + (this.star5) * 5) / (this.count + 1) * 10) / 10,
                percen: (((this.star1) * 1 + (this.star2 + 1) * 2 + (this.star3) * 3 + (this.star4) * 4 + (this.star5) * 5) / (this.count + 1)) * 20,
                createdOn: new Date()
            }
        });
        return false;
    },

    "click .js-three": function(event) {
        var vote_id = this._id;

        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star3: this.star3 + 1,
                count: this.count + 1,
            }
        });
        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star_sum: Math.round(((this.star1) * 1 + (this.star2) * 2 + (this.star3 + 1) * 3 + (this.star4) * 4 + (this.star5) * 5) / (this.count + 1) * 10) / 10,
                percen: (((this.star1) * 1 + (this.star2) * 2 + (this.star3 + 1) * 3 + (this.star4) * 4 + (this.star5) * 5) / (this.count + 1)) * 20,
                createdOn: new Date()
            }
        });
        return false;
    },
    "click .js-four": function(event) {
        var vote_id = this._id;

        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star4: this.star4 + 1,
                count: this.count + 1,
            }
        });
        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star_sum: Math.round(((this.star1) * 1 + (this.star2) * 2 + (this.star3) * 3 + (this.star4 + 1) * 4 + (this.star5) * 5) / (this.count + 1) * 10) / 10,
                percen: (((this.star1) * 1 + (this.star2) * 2 + (this.star3) * 3 + (this.star4 + 1) * 4 + (this.star5) * 5) / (this.count + 1)) * 20,
                createdOn: new Date()
            }
        });
        return false;
    },
    "click .js-five": function(event) {
        var vote_id = this._id;
        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star5: this.star5 + 1,
                count: this.count + 1,
            }
        });
        Votes.update({
            _id: vote_id
        }, {
            $set: {
                star_sum: Math.round(((this.star1) * 1 + (this.star2) * 2 + (this.star3) * 3 + (this.star4) * 4 + (this.star5 + 1) * 5) / (this.count + 1) * 10) / 10,
                percen: (((this.star1) * 1 + (this.star2) * 2 + (this.star3) * 3 + (this.star4) * 4 + (this.star5 + 1) * 5) / (this.count + 1)) * 20,
                createdOn: new Date()
            }
        });
        return false;
    },
})
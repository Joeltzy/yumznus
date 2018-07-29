Template.stats.helpers({
        tolal_count: function() {
            var arrlist = new Array();
            var count_list = Votes.find().fetch();

            for (i = 0; i < Votes.find().count(); i++) {
                arrlist.push(count_list[i].count);
            }
            
            const arrSum = arr => arr.reduce((a,b) => a+b, 0)
            return arrSum(arrlist);
        }, 

        stall_count: function() {
            return Votes.find().count();
        }, 

        rev_count: function() {
            
            return FFrevs.find().count() + + FCrevs.find().count() + TPrevs.find().count() + DECKrevs.find().count() + FRrevs.find().count() + ACrevs.find().count();; 
            
        },
});



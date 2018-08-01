Template.stats.helpers({

        total_count: function() {
            var arrlist = new Array();
            var count_list = Votes.find().fetch();

            for (i = 0; i < Votes.find().count(); i++) {
                arrlist.push(count_list[i].count);
            }
            const arrSum = arr => arr.reduce((a,b) => a+b, 0)

var total_counter = arrSum(arrlist);
$({countNum: $('#v_count').text()}).animate({countNum: total_counter}, {
      duration: 6000, 
      easing:'linear',
      step: function() {
        $('#v_count').text(Math.floor(this.countNum));
      },
      complete: function() {
        $('#v_count').text(total_counter);
      }
    });




           //return arrSum(arrlist);
        }, 




        stall_count: function() {

var stall_counter = Votes.find().count();
$({countNum: $('#tata').text()}).animate({countNum: stall_counter}, {

      duration: 6000, 
      easing:'linear',
      step: function() {
        $('#s_count').text(Math.floor(this.countNum));
      },
      complete: function() {
        $('#s_count').text(stall_counter);
      }

    })

        }, 






        rev_count: function() {
        var rev_counter = FFrevs.find().count() +  FCrevs.find().count() + TPrevs.find().count() + DECKrevs.find().count() + FRrevs.find().count() + ACrevs.find().count();    
            
        $({countNum: $('#r_count').text()}).animate({countNum: rev_counter}, {
      duration: 1300, 
      easing:'linear',
      step: function() {
        $('#r_count').text(Math.floor(this.countNum));
      },
      complete: function() {
        $('#r_count').text(rev_counter);
      }
    }); 
        },
});




// console.log(Votes.find().count());
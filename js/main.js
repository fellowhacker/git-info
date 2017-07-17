$(function() {  

    // prevents search-from from submitting

    $('#search-form').submit( function(e) {

        e.preventDefault();

    });

});

function searchForUsers() {


  	$('#disp_res').html('');
    $('#repos').html('');
    q = $('#query').val();

    $('input').blur();
    $('#nouserfound').hide();

    if(!q.trim()) {
       $('#alert').show();
       return false;
    }

    $('#alert').hide();

    $('.circleLoader').show();


    var searchurl = 'https://api.github.com/users/'+q;

    $.ajax( {
          
        url : searchurl,         

        success :  function(data) {  

     			if(data.name == null || data.message == 'Not Found') {
            $('#nouserfound').show();
            $('.circleLoader').hide();
     				return false;
     			}

          $('#nouserfound').hide();

          $('.circleLoader').hide();

          $('#disp_res').html(getBasicInfo(data));

        },

        error : function(data) {
          $('.circleLoader').hide();
          $('#nouserfound').show();
        }

        });

}




function getBasicInfo(data) {

	  var name = data.name
    var username = data.login
    var followers = data.followers
    var following = data.following
    var bio = data.bio
    var url = data.html_url
    var repos = data.public_repos
    var imgUrl = data.avatar_url
    var gists = data.public_gists
    var location = data.location
    var blog = data.blog
    var joined  = data.created_at
    var loca = ''
    var blogdis = ''
    joined  = "<span style='color:#e44c65'>Joined at </span>" + getmonth(joined.substr(5,6).substr(0,2)) +  " , " + joined.substr(0,4)
    
    if(location) {
      loca =  '<span> <img src="img/locat.png" width="27px"> <span style="color:white">' + location + '</span> <br>  </span>'
    }
    if(blog) {
      blogdis = '  <img src="img/blog.png" width="25px"> <span style="color:white"><a href="' + blog + '" target="blank">' + blog + '</a></span> <br>  '
    }

    var xx = data.repos_url + '?page=1&per_page=100';
    getrepos(xx)
    getactivity(username);
 

    var output =  '<div class="row">' + 

			'<div class="col-md-2"></div>' + 

			'<div class="col-md-8 text-center">' + 
				'<img src="' + imgUrl + '" style="width: 150px;height: 150px;margin:0 auto" class="img-responsive img-circle">' + 
				'<h3 style="color:white"><a href=" ' + url + ' " style="text-decoration: none" target="blank">' + name + '</a> <br><span style="color: #e44c65;">Username:-</span><a href="'+ url + '" style="text-decoration: none" target="blank"> ' + username + '</a><br> '+
        '  <img src="img/joined.png" width="27px"> <span style="color:white">' + joined + '</span> <br>  ' +
          loca   + blogdis + 
			//	' <span> <img src="img/locat.png" width="27px"> <span style="color:white">' + location + '</span> <br>  </span> '+loca+' ' + 
      //  '  <img src="img/blog.png" width="25px"> <span style="color:white"><a href="' + blog + '" target="blank">' + blog + '</a></span> <br>  ' + 
        
        '<span style="color: #e44c65;">Repositories:-</span><span style="color:white">' + repos + '</span> <br>' + 
				'<span style="color: #e44c65;" class="fol">Followers:- </span>' + followers + ' &nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #e44c65;" class="fol">Following:- </span> ' + following  +
				' <br><span style="color: #e44c65;">Bio:- </span><span style="color:white"> ' + bio + ' </span> <br> </h3>' +
        
        '<div class="row">' +
          ' <div class="col-md-3 text-center">' +
                '<a href="#goToRepos" id="disNone1"><button class="btn btn-success" style="" id="butrep"><span style="font-size: 140%;">Click to view Repositories</span></button></a>'+
            '</div>' +

          '<div class="col-md-5">' +
          '</div>' +

          '<div class="col-md-4 text-center">' +
             '<a href="#" id="disNone1"><button class="btn btn-success" style="" id="butactivity"><span style="font-size: 140%;">Click to view Activty</span></button></a>' +
          '</div>'+
       
        '</div>' +
 			'</div>' +

			'<div class="col-md-2"></div>' +

		'</div> '

return output;

    
}


function getrepos(repoUrl) {

    $.get(

      repoUrl, {

      }, function(data) {

          //console.log(data);

          if(data.length == 0) {
            $('#repos').html('<h1 style="color:red;text-align:center">No Repositories found !</h1>');
            return;
          }
          $.each(data, function(i) {

            $('#repos').append(dispRep(data, i));

          });


      });

}

function dispRep(data, i) {
 
    if(!data[i].language) {
      lang = "";
    }
    else {
      lang =  " ( " + data[i].language + " ) ";
    }
    var output = '<div class="row">' +
     
                    '<div class="col-md-12 text-center">' +
                      '<div class="repoinfo">' +
                      '<h3 style="margin:0;word-wrap: break-word;color:#e44c65;"><a href="' + data[i].html_url + '"  style="text-decoration: none;color:#e44c65" target="blank">  ' + data[i].name  + '' +
                      '   <span style="color:white;font-size:70%;">' + lang + '</span> </h3></a> ' +
                      '<p style="color:white"> <span style="color:#e44c65">Description:</span> ' + data[i].description + '</p>' +
                      '<img src = "img/fork.png" width="20px"><span style="color:#e44c65"> Forks : <span style="color:white">' + data[i].forks_count + '</span> </span>  ' +
                      '&nbsp;&nbsp;<img src = "img/starr.png" width="20px"><span style="color:#e44c65"> Forks : <span style="color:white">' + data[i].forks_count + '</span> </span>  ' +
                      '</div>' +
                    '</div>' +
                     
                  '</div><br>' 

      return output;


}


$( function() {

    $('#butactivity').click( function() {

      getactivity();

    })

})


function getactivity(username) {

    var url = 'https://api.github.com/users/'+ username +'/events';
    $.ajax( {

      url : url,

      success : function(data) {
       // console.log(data)
       $.each(data, function(i) {
    //    console.log(data[i].repo.name)

        $('#activity').append(dispActivity(data, i)) ;

       });

      }

    });  

}

function dispActivity(data, i) {

  var all = "";

    if(data[i].type === 'CreateEvent') {
      var name = data[i].repo.name
      var outputact = '<div class="row">' +
     
                    '<div class="col-md-12 text-center activityinfo">' +
                       '<p style="color:white;"> <i class="fa fa-code-fork small"></i>Created <span style="color:#e44c65">  repository </span> <a href="https://www.github.com/'+ name +'" style="color:white;" target="blank">' + name + '</a></p>' +
                    '</div>' +
                     
                  '</div><br>' 
      console.log(all.outputact)

      all = all.outputact

      return all;
    }
    else if(data[i].type === 'ForkEvent') {
      var name = data[i].repo.name
      var username = data[i].actor.login
      var tourl = data[i].payload.forkee.full_name;
      var outputact = '<div class="row">' +
     
                    '<div class="col-md-12 text-center activityinfo">' +
                       '<p style="color:white;"> <img src = "img/fork.png" width="20px"> Forked <span style="color:#e44c65"> from </span> <a href="https://www.github.com/'+ name +'" style="color:white;" target="blank"> ' + name + ' </a><br> ' + 
                       '<span style="color:#e44c65"> to </span><a href="https://www.github.com/'+ tourl +'" style="color:white;" target="blank"> '  +   tourl + ' </a></p>' +
                    '</div>' +
                     
                  '</div><br>' 

     // return all = all.outputact;
    }

}


function getmonth(month) {

  if(month == 01) {
    return "Jan"
  }
  else if (month == 02){
    return "Feb"
  }
  else if (month == 03){
    return "Mar"
  }
  else if (month == 04){
    return "April"
  }
  else if (month == 05){
    return "May"
  }
  else if (month == 06){
    return "June"
  }
  else if (month == 07){
    return "July"
  }
  else if (month == 08){
    return "Aug"
  }
  else if (month == 09){
    return "Sep"
  }
  else if (month == 10){
    return "Oct"
  }
  else if (month == 11){
    return "Nov"
  }
  else if(month == 12){
    return "Dec"
  }


}
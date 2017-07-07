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

    q = q.trim();

    $('input').blur();
    $('#nouserfound').hide();

    if(!q) {
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
    var xx = data.repos_url + '?page=1&per_page=100';
    getrepos(xx)
 

    var output =  '<div class="row">' + 

			'<div class="col-md-2"></div>' + 

			'<div class="col-md-8 text-center">' + 
				'<img src="' + imgUrl + '" style="width: 150px;height: 150px;margin:0 auto" class="img-responsive img-circle">' + 
				'<h3 style="color:white"><a href=" ' + url + ' " style="text-decoration: none" target="blank">' + name + '</a> <br><span style="color: #e44c65;">Username:-</span><a href="'+ url + '" style="text-decoration: none" target="blank"> ' + username + '</a><br>' +
				'<span style="color: #e44c65;">Repositories:-</span><span style="color:white">' + repos + '</span> <br>' + 
				'<span style="color: #e44c65;" class="fol">Followers:- </span>' + followers + ' &nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #e44c65;" class="fol">Following:- </span> ' + following  +
				' <br><span style="color: #e44c65;">Bio:- </span><span style="color:white"> ' + bio + ' </span> <br> </h3>' +
        '<br><a href="#goToRepos" id="disNone1"><button class="btn btn-success" style="" id="butrep"><span style="font-size: 140%;">Click to view Repositories</span></button></a>' +
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


 
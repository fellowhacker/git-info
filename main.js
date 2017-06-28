$(function() {  

    // prevents search-from from submitting

    $('#search-form').submit( function(e) {

        e.preventDefault();

    });

});

function searchForUsers() {


	$('#disp_res').html('');
    $('#buttons').html('');
    q = $('#query').val();
    //console.log(q);
    var searchurl = 'https://api.github.com/users/'+q;

    $.get(
         searchurl, {
  
        }, function(data) {

 			console.log(data.name)

 			if(data.name == null) {

 				return false;
 			}

            $('#disp_res').html(getBasicInfo(data));

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
    console.log(url)

    var output =  '<div class="row">' + 

			'<div class="col-md-2"></div>' + 

			'<div class="col-md-8 text-center">' + 
				'<img src="' + imgUrl + '" style="width: 150px;height: 150px;margin:0 auto" class="img-responsive img-circle">' + 
				'<h3 style="color:white">' + name + ' <br><span style="color: #e44c65;">Username:-</span><a href="#" style="text-decoration: none"> ' + username + '</a><br>' +
				'<span style="color: #e44c65;" class="fol">Followers:- </span>' + followers + ' &nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #e44c65;" class="fol">Following:- </span> ' + following + '</h3>' +
			'</div>' +

			'<div class="col-md-2"></div>' +

		'</div> '

return output;

    

}

/*

{
  "login": "fellowhacker",
  "id": 20399005,
  "avatar_url": "https://avatars3.githubusercontent.com/u/20399005?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/fellowhacker",
  "html_url": "https://github.com/fellowhacker",
  "followers_url": "https://api.github.com/users/fellowhacker/followers",
  "following_url": "https://api.github.com/users/fellowhacker/following{/other_user}",
  "gists_url": "https://api.github.com/users/fellowhacker/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/fellowhacker/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/fellowhacker/subscriptions",
  "organizations_url": "https://api.github.com/users/fellowhacker/orgs",
  "repos_url": "https://api.github.com/users/fellowhacker/repos",
  "events_url": "https://api.github.com/users/fellowhacker/events{/privacy}",
  "received_events_url": "https://api.github.com/users/fellowhacker/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Naveen Manikanta Kodigudla",
  "company": null,
  "blog": "https://fellowhacker.github.io/",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": "Born to code. ",
  "public_repos": 26,
  "public_gists": 0,
  "followers": 5,
  "following": 15,
  "created_at": "2016-07-11T12:40:12Z",
  "updated_at": "2017-06-01T16:02:25Z"
}


*/
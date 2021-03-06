$(document).ready(function() {
	var uid;
	var accessToken;
	var categoryData = [];

	//transitions and stuff
	$('#map-container').hide();

	//Check Permissions

	// var checkPermissions = function(){
	// 	FB.api('/me/permissions', function(response) {
	// 		console.log(response)
	// 		$.each(response.data,function(obj,data){
	// 			console.log(data.permission+ "   "+data.status)
	// 			if(data.permission == "user_likes"){
	// 				if(data.status == "granted"){
	// 					console.log("We Have Permission ")
	// 				}else{
	// 					console.log(" GO GET THEM");
	// 					fbLogin();
	// 				}
	// 			}
	// 		})
	// 	});
	// }
	// User Submit via enter
	$(document).keypress(function(e) {
    	if(e.which == 13) {
    		//stop default page reload
    		e.preventDefault();
    		//click build neighborhood button
       		$('#build-neighborhood').click();
    	}
	});
	//Capture User Submit

	$('#build-neighborhood').on('click', function () {
    	var $btn = $(this).button('loading');
    	var address = $("#address").val();
    	initialize();

    	// business logic...
    	$btn.button('reset')
    	$('#map-container').slideDown(300,function(){
    		resizeMap();
    		codeAddress(address);
    		getYelp(categoryData,address);
    	})
  	})


	//Get User Likes
	var getLikes = function(){
		FB.api('/me/likes?limit=200&fields=category', function(response) {
		var stringdata = JSON.stringify(response)

			if(stringdata.indexOf("Music")>= 0){
				categoryData.push("live music venues")
				$('#likes-display').append(' Music, ');
			};
			if(stringdata.indexOf("Restaurant")>= 0){
				categoryData.push("restaurants")
				$('#likes-display').append(' Food, ');
			};
			if(stringdata.indexOf("Bar")>= 0){
				categoryData.push("bars")
				$('#likes-display').append(' Bars, ');
			};
			if(stringdata.indexOf("Book")>= 0 || stringdata.indexOf("Author")>= 0 ){
				categoryData.push("book stores")
				$('#likes-display').append(' Books ');
			};

			// if(stringdata.indexOf("Church")>= 0 || stringdata.indexOf("Religious")>= 0 ){
			// 	categoryData.push("churches")
			// 	$('#likes-display').append('Religion');
			// };
			// $.each(response.data,function(i,val){
			// 	if($.inArray(val.category,categoryData) == -1){
			// 		categoryData.push(val.category);
			// 		$("#category-list").append('<div class="col-md-3" id="category-items"><label class="checkbox-inline"><input type="checkbox">'+val.category+'</label></div>');
			// 	}
			// })
		});
	}

	
	//Login to FB
	var fbLogin = function(){
		 FB.login(checkLogin, {scope:'user_likes',return_scopes: true});
		 //FB.login(checkLogin, {return_scopes: true});
	}
	//Check Login Status
	var checkLogin = function(response){
		if (response.status === 'connected') {
			// the user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire
			console.log(response)
			uid = response.authResponse.userID;
			accessToken = response.authResponse.accessToken;
			getLikes();
		} else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook, 
			// but has not authenticated your apps
			console.log("Not Authorized")
			fbLogin();
		} else {
			// the user isn't logged in to Facebook.
			console.log("Not Logged In")
			fbLogin();
		}
	}
	//Set up SDK
  $.ajaxSetup({ cache: true });
  $.getScript('http://connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId      : '431061247042841',
      xfbml      : true,
      version    : 'v2.1',
      status     : true,
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    //FB.getLoginStatus(checkLogin);
    fbLogin();
    //FB.login(checkLogin, {scope: 'user_likes',return_scopes: true});
  });
});
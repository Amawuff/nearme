var formData = {category: "food",location:"Detroit"}

var getYelp = function(){
	console.log("GETTING YELP")
	  $.ajax({
	      url: "yelp.php",
	      type: "post",
	      data: formData,
	      datatype: 'json',
	      success: function(data){
	      		console.log("LAT: "+data.location.coordinate.latitude)     
	      },
	      error:function(){
	          console.log("ERROR JERK OFF");
	      }   
	}); 
}
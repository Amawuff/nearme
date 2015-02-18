var businessDisplay = function(data){
	console.log("business locations" + data);

}

var plotLocations = function(data){
	console.log("Data: " + data);
	$.each(data.businesses,function(i,val){
		var lat = val.location.coordinate.latitude;
		var lng = val.location.coordinate.longitude;
		plotMarker(lat,lng);
	})
}
var getYelp = function(cat,address){
	var formData = {category:cat.toString(),location:address}
	console.log("GETTING YELP "+cat+" , "+address)
	  $.ajax({
	      url: "yelp.php",
	      type: "get",
	      data: formData,
	      datatype: 'json',
	      success: function(data){
	      		businessDisplay(data);
	      		plotLocations(data);
	      		//plotMarker(data.location.coordinate.latitude,data.location.coordinate.longitude)     
	      },
	      error:function(){
	          console.log("ERROR JERK OFF");
	      }   
	}); 
}
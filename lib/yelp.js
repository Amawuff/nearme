
var displayLocations = function(data){
	console.log("Data: " + data);
	$.each(data.businesses,function(i,val){
		console.log(val.name)
		console.log(val.location.address)
		//Display Business Results
		//Write Out to Screen
		$('#yelp-places').append('<div class="col-md-3"><strong>'+val.name+'</strong><p>'+val.location.address+'</p></div>')
		//
		//Plot On Map
		plotMarker(val.location.coordinate.latitude,val.location.coordinate.longitude,val.name);
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
	      		displayLocations(data);
	      },
	      error:function(){
	          console.log("ERROR JERK OFF");
	      }   
	}); 
}
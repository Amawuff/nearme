
var displayLocations = function(data){
	console.log("Data: " + data);
	$.each(data.businesses,function(i,val){
		//Display Business Results
		//Write Out to Screen
		//$('#id').appendHtml('<div class="col-md-2" id="something">'+)
		//
		//Plot On Map
		plotMarker(val.location.coordinate.latitude,val.location.coordinate.longitude);
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

var getYelp = function(cat,address){
	var formData = {category: cat,location:address}
	console.log("GETTING YELP "+cat+" , "+address)
	  $.ajax({
	      url: "yelp.php",
	      type: "get",
	      data: formData,
	      datatype: 'json',
	      success: function(data){
	      		console.log(data);
	      		//console.log("LAT: "+data.location.coordinate.latitude)     
	      },
	      error:function(){
	          console.log("ERROR JERK OFF");
	      }   
	}); 
}
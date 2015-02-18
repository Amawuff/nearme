var map; //<-- This is now available to both event listeners and the initialize() function
var geocoder;
var icons = ['images/food-icon.png','images/music.png','images/book.png'];

function resizeMap(){
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center);
}

function plotMarker(lat,lng){
  var myLatLng = new google.maps.LatLng(lat,lng);
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: icons[Math.floor(Math.random()*3)],
    zIndex: 3
  });
}

function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          icon: 'images/rent-com.png',
          position: results[0].geometry.location,
          zIndex: 2
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


function initialize() {
  var mapOptions = {
   center: new google.maps.LatLng(42.473369,-83.221873),
   zoom: 10,
   mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
  geocoder = new google.maps.Geocoder();
  google.maps.event.addDomListener(window, "resize", resizeMap)
}
//  //setMarkers(map,places);
//  function setMarkers(map, locations) {
//   // Add markers to the map

//   // Marker sizes are expressed as a Size of X,Y
//   // where the origin of the image (0,0) is located
//   // in the top left of the image.

//   // Origins, anchor positions and coordinates of the marker
//   // increase in the X direction to the right and in
//   // the Y direction down.
 
//   // Shapes define the clickable region of the icon.
//   // The type defines an HTML &lt;area&gt; element 'poly' which
//   // traces out a polygon as a series of X,Y points. The final
//   // coordinate closes the poly by connecting to the first
//   // coordinate.
  
  
//   for (var i = 0; i < locations.length; i++) {
//     var venue = locations[i];
//     var myLatLng = new google.maps.LatLng(venue[1], venue[2]);
//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         icon: venue[4],
//         title: venue[0],
//         zIndex: venue[3]
//     });
//    }
//   }
// }
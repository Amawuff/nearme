			function initialize() {
			console.log("Map initialization happening")
        var mapOptions = {
          center: { lat: 42.473369, lng: -83.221873},
          zoom: 10,
          draggable: false

        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        
       	var places = [
  ['Callahans', 42.620471,-83.245066, 1,'images/music.png'],
  ['Magic Stick', 42.351162,-83.05991, 2,'images/music.png'],
  ['Royal Oak Music Theatre',42.48734,-83.147408, 3,'images/music.png'],
  ['The Book Beat', 42.4803193,-83.266704, 4,'images/book.png'],
  ['Berkley Book Corner',42.4854656,-83.2580983, 5,'images/book.png'],
  ['Spitzers Hebrew Books & Gifts', 42.4854656,-83.2580983, 6,'images/book.png']

];

        setMarkers(map,places);
 function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
 
  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.
  
  
  for (var i = 0; i < locations.length; i++) {
    var venue = locations[i];
    var myLatLng = new google.maps.LatLng(venue[1], venue[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: venue[4],
        title: venue[0],
        zIndex: venue[3]
    });
   }
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
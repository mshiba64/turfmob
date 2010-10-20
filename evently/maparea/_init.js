function(e, params) {
  var initialLocation;
  // Would you like to go to NY? or Siberia??
  var siberia = new google.maps.LatLng(60, 105);
  var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
  var browserSupportFlag =  new Boolean();
  var map;
  var infowindow = new google.maps.InfoWindow();

  // Default zoom level & map type
	var myOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  // Creating Google Map Object and storing it in #foo for later use
  map = new google.maps.Map(document.getElementById("maparea"), myOptions);
  $$("#foo").map = map;
  
  // Try W3C Geolocation method (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      contentString = "Location found using W3C standard";
      map.setCenter(initialLocation);
      // infowindow.setContent(contentString);
      // infowindow.setPosition(initialLocation);
      // infowindow.open(map);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });

  // Try Google Gears Geolocation
  } else if (google.gears) {
    browserSupportFlag = true;
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
      contentString = "Location found using Google Gears";
      map.setCenter(initialLocation);
      // infowindow.setContent(contentString);
      // infowindow.setPosition(initialLocation);
      // infowindow.open(map);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });

  // Browser doesn't support Geolocation
  } else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag == true) {
    initialLocation = newyork;
    contentString = "Error: The Geolocation service failed.";
  } else {
    initialLocation = siberia;
    contentString = "Error: Your browser doesn't support geolocation. Are you in Siberia?";
  }
  map.setCenter(initialLocation);
  infowindow.setContent(contentString);
  infowindow.setPosition(initialLocation);
  infowindow.open(map);
}

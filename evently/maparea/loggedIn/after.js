function(data) {
	var map;
	var p;
	var items;
	map = $$("#foo").map;
	
	items = data.rows.map(function(r) {
      p = (r.value && r.value.profile) || {};
      p.id = r.value && r.value._id;
      p.condition = r.value && r.value.condition;
      p.description = r.value && r.value.description;
      p.itemname = r.value && r.value.itemname;
      p.price = r.value && r.value.price;
      return p;
    });

  // Add markers to the map
  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = new google.maps.MarkerImage('images/marker_public_01.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(31, 23),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0, 32));
  var shadow = new google.maps.MarkerImage('images/marker_public_shadow_01.png',
      // The shadow image is larger in the horizontal dimension
      // while the position and offset are the same as for the main image.
      new google.maps.Size(33, 12),
      new google.maps.Point(0,0),
      new google.maps.Point(-15, 20));
      // Shapes define the clickable region of the icon.
      // The type defines an HTML <area> element 'poly' which
      // traces out a polygon as a series of X,Y points. The final
      // coordinate closes the poly by connecting to the first
      // coordinate.
  var shape = {
      coord: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };

  var infowindow = new google.maps.InfoWindow({
		maxWidth: 200
  });
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var myLatLng = new google.maps.LatLng(item.m_latitude, item.m_longitude);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        shadow: shadow,
        icon: image,
        shape: shape,
        title: item.itemname,
        zIndex: 5,
        content: item
  	});


  	google.maps.event.addListener(marker, 'click', function() {
			var marker = this;
			var item = this.content;
    	var contentString = '<p><div id="itemname">' + item.itemname + '</div><br />' +
    	  '<div id="nickname">(by ' + item.nickname + ')</div></p>' +
        '<div id="itemimage"><img src="images/' + item.id + '.jpg" width="80px" height="80px"></div>' +
        '<div id="price">price: ' + item.price + '</div>' +
        '<div id="price">condition: ' + item.condition + '</div>' +
        '<div id="price">' + item.description + '</div>' +
        '<hr size="1"><div id="messagepage"><a href="#" onclick="var item; item={}; item.id = \'' + item.id + '\'; $(this).trigger(\'messageForm\', [item]); return false;">Send Message</a></div>';

    	infowindow.setContent(contentString);
      infowindow.open(map, marker);
    });
  }
  
}



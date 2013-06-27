
      function initialize() {
	    var zoom = 3;
	    var latlng = new google.maps.LatLng(37.4419, -100.1419);
	    var location = "Showing default location for map.";

    // If ClientLocation was filled in by the loader, use that info instead
    if (google.loader.ClientLocation) {
      zoom = 13;
      latlng = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
      location = "Showing IP-based location: <b>" + getFormattedLocation() + "</b>";
    }

    var myOptions = {
	zoom: zoom,
	streetViewControl:false,
	panControl:false,
    zoomControl:true,
    zoomControlOptions: {
      style:google.maps.ZoomControlStyle.SMALL
    },
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   map = new google.maps.Map(document.getElementById("map"),
                                myOptions);



var customIcons = {
      CA: {
        icon: 'includes/images/1.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
      MA: {
        icon: 'includes/images/2.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      }
    };
        var markers = [];
		for (var i = 0, length = data.photos.length; i < length; i++) {
      
          var dataPhoto = data.photos[i];
          var latLng = new google.maps.LatLng(dataPhoto.latitude,
              dataPhoto.longitude);
var state = dataPhoto.state_province;
var icon = customIcons[state] || {};

var contentString = dataPhoto.title ;
          var marker = new google.maps.Marker({
            position: latLng,
		map: map,

       // zIndex: Math.round(latLng.lat()*-100000)<<5,        
	icon: icon.icon,
        shadow: icon.shadow
          });

  attachIWindow(contentString, marker);


            markers.push(marker);
        }
        var markerCluster = new MarkerClusterer(map, markers);
      }
	  
	  
      google.maps.event.addDomListener(window, 'load', initialize);



function getFormattedLocation() {
    if (google.loader.ClientLocation.address.country_code == "US" &&
      google.loader.ClientLocation.address.region) {
      return google.loader.ClientLocation.address.city + ", " 
          + google.loader.ClientLocation.address.region.toUpperCase();
    } else {
      return  google.loader.ClientLocation.address.city + ", "
          + google.loader.ClientLocation.address.country_code;
    }
  }

 function attachIWindow(content, marker){


        var infowindow = new google.maps.InfoWindow({
            content: content,

        });
        google.maps.event.addListener(marker, 'click', function(){
            infowindow.open(map, marker);
        });
    }


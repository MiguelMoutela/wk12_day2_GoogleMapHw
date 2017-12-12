const MapWrapper = function(container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom:zoom
  });
  this.markers = []
}

const prettyGPS = function(coords) {
  return `you are at ${coords.lat}${coords.lng}.`
}

MapWrapper.prototype.addMarker = function(coords)  {
  const infoWindowLocation = new google.maps.InfoWindow({
    content: prettyGPS(coords)
  });
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    infoWindow: infoWindowLocation
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindowLocation.open(this.googleMap, this);
  });
  this.markers.push(marker);
}
MapWrapper.prototype.addClickEvent = function() {
  google.maps.event.addListener(this.googleMap, 'click', function(event) {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    this.addMarker(position);
  }.bind(this));
}
MapWrapper.prototype.bounceMarkers = function() {
  this.markers.forEach(function(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE)
  })
}
MapWrapper.prototype.StopBounceMarkers = function() {
  this.markers.forEach(function(marker){
    marker.setAnimation(null);
  })
}
MapWrapper.prototype.removeAllMarkers = function() {
  this.markers.forEach(function(marker){
    marker.setMap(null);
  })
}
MapWrapper.prototype.takeMeToChicago = function() {
  const center = {
    lat: 41.8781,
    lng: -87.6298
  }
  this.googleMap.setCenter(center);
}

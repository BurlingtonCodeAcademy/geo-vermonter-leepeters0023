start = () => {
  //builds a representation of VT as a variable for use with Leaflet-Pip
  let VT = L.geoJSON(borderData);
  //sets random point to start game, and makes sure it is within the bounds of VT with Pip
  let initialPoint = this.ranLonLat();
  let newPoint = leafletPip.pointInLayer(initialPoint, VT);
  while (newPoint.length === 0) {
    initialPoint = this.ranLonLat();
    newPoint = leafletPip.pointInLayer(initialPoint, VT);
  }
  //flips the array so it is in lat, lon format
  let flippedPoint = [initialPoint[1], initialPoint[0]]
  //gets county and town of random point, and builds initial state for gameplay
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${initialPoint[1]}&lon=${initialPoint[0]}&format=json`)
  
    .then(data => data.json())
    .then(jsonObj => {
      let town;
      //determines type of town that the point is in, and sets it to town variable
      if (jsonObj.address.city) {
        town = jsonObj.address.city;
      } else if (jsonObj.address.town) {
        town = jsonObj.address.town;
      } else if (jsonObj.address.village) {
        town = jsonObj.address.village;
      } else if (jsonObj.address.hamlet) {
        town = jsonObj.address.village;
      }
      this.setState({
        mainMap: {
          lat: flippedPoint[0],
          lon: flippedPoint[1],
          zoom: 18,
        },
        mapCoords: [flippedPoint],
        county: jsonObj.address.county,
        town: town,
        score: 100,
        status: 'Thinking',
        count: 0,
        gameStarted: true,
        win: false
      });
    });
};
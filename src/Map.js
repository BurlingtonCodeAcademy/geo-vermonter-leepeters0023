import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import borderData from './border.js'
import LeafletPip from 'leaflet-pip'

class Maplet extends Component {
  constructor(props){
    super(props);
  }
  

  componentDidMount() {
    //Creates the Map
    this.map = L.map('map', {
      center: [44.0886, -72.7317],
      zoom: 8,
      layers: [L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x})',
    { attribution : 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' }),
  ],
    gameStart: false
  })
  L.geoJSON(borderData).addTo(this.map) 
  
}

  componentDidUpdate({markerPosition, startPosition}){

  }
    
    render() {
  return <div id='map' />
  }

}
export default Maplet


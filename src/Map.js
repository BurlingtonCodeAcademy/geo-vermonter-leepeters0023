import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import borderData from './border.js'
import LeafletPip from 'leaflet-pip'

class Maplet extends Component {
  constructor(props){
    super(props);
    this.state = {
      center: this.props.center,
      
    }
  }
  
  componentDidMount() {
    //Creates the Map
    this.map = L.map('map', {
      center: [44.0886, -72.7317],
      zoom: this.props.zoom,
      layers: [L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x})',
    { attribution : 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community', zoomControl: false}),
  ],
    gameStart: false,
  })
  L.geoJSON(borderData).addTo(this.map) 
  
}
  componentDidUpdate() {
    this.map.setZoom(this.props.zoom)
   /* this.map.dragging.disable()
    this.map.scrollWheelZoom.disable()
    this.touchZoom.disable()
    this.doubleClickZoom.disable()
    this.boxZoom.disable()
    this.keyboard.disable() */
    // ----->> disables were throwing errors on start, commenting out for now <<------
  }
    render() {
  return <div id='map' />
  }

}
export default Maplet


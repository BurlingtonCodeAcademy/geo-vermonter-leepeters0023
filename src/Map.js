import React, { Component } from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import borderData from './border.js'

class Maplet extends Component {

state = {
  lat: 44.0886,
  lng: -72.7317,
  zoom: 8,
}

componentDidMount() {

}

  render() {
    const position = [this.state.lat, this.state.lng] 
    return (
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution= 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
          <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </Map>
    )
  }
}

export default Maplet


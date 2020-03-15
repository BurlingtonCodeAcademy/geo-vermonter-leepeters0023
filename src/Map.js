import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import borderData from './border.js'
import LeafletPip from 'leaflet-pip'

class Maplet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerView: this.props.centerView
    
    }
  }

  componentDidMount() {
    //Creates the Map
    this.map = L.map('map', {
      centerView: [44.0886, -72.7317],
      zoom: this.props.zoom,
      layers: [L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x})',
        { attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community', zoomControl: false }),
      ],
    })
    //center the map on VT and zooms out
    this.map.setView([43.89, -72.7317], 8)

    //Gives the outline of VT
    this.props.vtBorder.addTo(this.map).setStyle({ fillColor: 'rgba(0,0,0,0)' })

    //Creates a map marker
    this.marker = L.marker(this.props.centerView).addTo(this.map)
  }

  componentDidUpdate() {
    //disable map controls
    this.map.setZoom(this.props.zoom)
    this.map.dragging.disable()
    this.map.scrollWheelZoom.disable()
    this.map.touchZoom.disable()
    this.map.doubleClickZoom.disable()
    this.map.boxZoom.disable()
    this.map.keyboard.disable()

    //setting the marker to initial position so it doesn't move when you click on NSEW buttons
    this.marker = L.marker(this.props.initialPoint).addTo(this.map)
    this.map.panTo(this.props.centerView)

    // If the centerView has updated, and sets a close zoom of point 
    if (this.props.centerView !== this.state.centerView) {
      this.setState({ centerView: this.props.centerView })
      this.map.setView(this.props.centerView, 18)
    }
  }
  render() {
    return <div id='map' />
  }

}
export default Maplet

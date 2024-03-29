import React, { Component } from 'react'
import L from 'leaflet'

// React Components ^ ^ ^ ------------------------
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
    //Center the map on VT and zooms out
    this.map.setView([43.89, -72.7317], 8)

    //Gives the outline of VT
    this.props.vtBorder.addTo(this.map).setStyle({ fillColor: 'rgba(0,0,0,0)' })

    //Creates a marker displaying a random lat lon
    this.marker = L.marker(this.props.centerView).addTo(this.map)
  }
  
  componentDidUpdate() {
    //disable map controls on game start 
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

    //Creates breadcrumb polyline following map movement 
    let polyArray = Array.from(this.props.pathArray)
    this.polyline = L.polyline(polyArray, {color: 'red', weight: '5', dashArray: '20, 20', dashOffset: '0'}).addTo(this.map);

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

import React from 'react';
//import L from 'leaflet';
//import leafletPip from 'leaflet-pip'; 
import Maplet from './Map.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div>
        <Maplet id="maplet" />
      </div>
    )
  }
}

export default App;
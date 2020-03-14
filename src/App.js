import React from 'react';
import L from 'leaflet';
import LeafletPip from 'leaflet-pip'; 
import Maplet from './Map.js';
import './App.css';
import borderData from './border.js'
import Infopanel from './Infopanel.js'

// Variable Declaration-------------------------------
let randLat;
let randLng;
let layerArray;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: false,
      quit: false,
      zoom: 8, 
      center: [44.0886, -72.7317],
      score: 100,
      startPoint: [ undefined, undefined],
      markerPosition: [ 44.0886, -72.7317]
    }
  }
  getRandomLat = () => { // return random latitute to a lot of decimal places (maybe trim later?)
    let lat = Math.random() * (45.005419 - 42.730315) + 42.730315;
    return lat;
}
getRandomLng = () => { // return random longitude to a lot of decimal places (maybe trim later?)
  let lng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1;
  return lng;
}
  startGame = () => {
      randLat = this.getRandomLat()
      console.log(randLat)
      randLng = this.getRandomLng()
      console.log(randLng)
      let layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));
      console.log(layerArray)
      while(layerArray.length === 0) {
        randLat = this.getRandomLat()
        randLng = this.getRandomLng()
        layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));
        console.log(layerArray)
      }
      this.setState({
        start: true,
        quit: false,
        score: 100,
        zoom: 18,
        startPoint: [ randLat, randLng],
        markerPosition: [ randLat,  randLng ]
      }) 
      console.log(this.markerPosition)
      console.log(this.startPoint)
    
  }

  makeGuess = () => {
    // take input from play in the form of a dropped pin
    // take coordinates from pin and check against random pin coordinates
    // clickable county menu appears 
    // check lat long against inner polygon and/ or county code
    // if correct, add points to score & alert is displayed 
    // if incorrect, subtract 10pts from score
  }

  //When player clicks on Quit button
  quitGame = () => {
    this.setState({
      start: false, })
      // info panel displays randomNum
      // and correct town & county is displayed
      // setTimeout(3000, resets page)
    
  }

  render() {
    return(
      <div>
        <div id="header">
        <button id="startButton" className="button" onClick={this.startGame} disabled={this.state.start}> Start Game</button>
        <button id="quitButton" className="button" onClick={this.quitGame} disabled={!this.state.start}>Quit</button>
        <button id="guessButton" className="button" onClick={this.makeGuess}disabled={!this.state.start}>Guess</button>
        </div>
        <div id="body">
          <Maplet id="maplet" zoom={this.state.zoom} markerPosition={this.state.markerPosition}/>
          <div id="menu"> 
          </div>
         </div>
        <Infopanel   /> 
      </div>
    )
  }
}

export default App;

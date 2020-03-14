import React from 'react';
import L from 'leaflet';
import LeafletPip from 'leaflet-pip'; 
import Maplet from './Map.js';
import './App.css';
import borderData from './border.js'
import Infopanel from './Infopanel.js'
import vtCountyPolygons from './vtCountyPolygons'

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
      centerView: [44.0886, -72.7317],
      score: 100,
      startPoint: [ undefined, undefined],
      markerPosition: [ 44.0886, -72.7317],
      modalDisplayed: false,
      counties: []
    }
  }
// counties func -------------------------------
componentDidMount() {
  fetch(vtCountyPolygons)
    .then(res => res.json())
    .then(result => {
      this.setState({
        counties: result.CNTYNAME 
      });
    });
}
// list of counties is assigned as an array to 'getCounty'
// getCounty is used to display list of counties as clickable list items
// pip checks random lat long against counties - what does this return? 
// if guess === correct county, win 

// counties func ^ ^ ---------------------------
getRandomLat = () => { 
    let lat = Math.random() * (45.005419 - 42.730315) + 42.730315;
    return lat;
}
getRandomLng = () => { 
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
      console.log(App.counties, 'this shit works')
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
      start: false,
      quit: true })
      // info panel displays randomNum
      // and correct town & county is displayed
      // setTimeout(3000, resets page)
    
  }

  render() {
    let { centerView, quit, zoom, start, score, startPoint, markerPosition, modalDisplayed } = this.state
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
            <div id="gridForDirectionalButtons">
              <button id="westButton" className="button" onClick={this.state.move}>West</button>   
              <button id="northButton" className="button" onClick={this.state.move}>North</button>   
              <button id="southButton" className="button" onClick={this.state.move}>South</button>  
              <button id="eastButton" className="button" onClick={this.state.move}>East</button>
            </div>      
          { // if give up clicked or user guessed correctly, give LocationInfo the markerPosition, county, and town 
            (quit) && 
              <Infopanel markerPosition={this.state.markerPosition} 
                            //  county={} town={}
                             /> }
          { // if give up button not clicked and user did not guess correctly, LocationInfo gets '??'
            (!quit) && 
              <Infopanel markerPosition={{lat: '?', lng: '?'}}
                            county={'?'} town={'?'} /> }
          </div>
          
         </div>
         
      </div>
    )
  }
}

export default App;

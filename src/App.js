import React from 'react';
import L from 'leaflet';
import LeafletPip from 'leaflet-pip';
import borderData from './border.js';
import ReactDOM from 'react-dom';

// ----------React Components---------------------------//
import Maplet from './Map.js';
import './App.css';
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
      guess: false,
      zoom: 8,
      borderLayer: L.geoJSON(borderData),
      center: { lat: 44.0886, lng: -72.7317 },
      score: 100,
      startPosition: { lat: 1, lng: 1 },
      markerPosition: { lat: 44.0886, lng: -72.7317 },
      pathArray: [],
      town: [],
      county: [],
      hamlet: [],
      village: [],
      modalDisplay: false,
    }
  }
  // Function to pick random coordinates and verify within VT-----------------

  checkValidCoord = () => {
    let randLat = Math.random() * (45.005419 - 42.730315) + 42.730315
    let randLng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1
    let layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));
    //If random coordinate is not within VT--------
    while (layerArray.length === 0) {
      let randLat = Math.random() * (45.005419 - 42.730315) + 42.730315
      let randLng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1
      layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));
    }

    this.setState({
      startPosition: { lat: randLat, lng: randLng },
      markerPosition: { lat: randLat, lng: randLng }
    })


    this.setState(state => {
      let pathArray = state.pathArray.concat(state.startPosition)
      return {
        pathArray
      }
    });

  }

  //Modal functions----------------------------------

  showModal = () => {
    this.setState({
      modalDisplay: true
    })
  }
  //When player starts the game--------------------------

  startGame = () => {
    this.setState({
      center: [randLat, randLng],
      start: true,
      quit: false,
      guess: false,
      score: 100,
      zoom: 18,
    })

    this.checkValidCoord()

    fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${randLat}&lon=${randLng}`)
    .then(data => data.json())
    .then(jsonObj => {
      let town;
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
        App: { 
        county: jsonObj.address.county,
        town: town,
        gameStarted: true,
        win: false
         }
      });
      console.log(jsonObj)
    });
  }

  //Direction Buttons-------------------------------------

  moveNorth = () => {
    const { lat, lng } = this.state.markerPosition
    this.setState({
      markerPosition: {
        lat: lat + 0.002,
        lng: lng
      },
      score: this.state.score - 1,
    });
    console.log(this.state.score)

    this.setState(state => {
      let pathArray = state.pathArray.concat(state.markerPosition)
      return {
        pathArray
      }
    })
  }

  moveSouth = () => {
    const { lat, lng } = this.state.markerPosition
    this.setState({
      markerPosition: {
        lat: lat - 0.002,
        lng: lng
      },
      score: this.state.score - 1,
    });
    console.log(this.state.score);
    this.setState(state => {
      let pathArray = state.pathArray.concat(state.markerPosition)
      return {
        pathArray
      }
    })
  }

  moveEast = () => {
    const { lat, lng } = this.state.markerPosition
    this.setState({
      markerPosition: {
        lat: lat,
        lng: lng + 0.0025
      },
      score: this.state.score - 1,

    });
    console.log(this.state.score);
    this.setState(state => {
      let pathArray = state.pathArray.concat(state.markerPosition)
      return {
        pathArray
      }
    })
  }

  moveWest = () => {
    const { lat, lng } = this.state.markerPosition
    this.setState({
      markerPosition: {
        lat: lat,
        lng: lng - 0.0025
      },
      score: this.state.score - 1,
    });
    console.log(this.state.score);
    this.setState(state => {
      let pathArray = state.pathArray.concat(state.markerPosition)
      return {
        pathArray
      }
    })
  }

//-------when player clicks guess button------------

  makeGuess = () => {
    this.setState({
      modalDisplay: true,
      guess: true //open the "guess" form 
    })
  }

  //When player clicks on Quit button
  quitGame = () => {
    this.setState({
      start: false,
      quit: true,
      guess: false
    })
    // info panel displays randomNum
    // and correct town & county is displayed
    // setTimeout(3000, resets page)

  }
// <Modal modalDisplay={this.state.modalDisplay} />

  returnPosition = () => {


  }

  render() {
    let quit = this.state.quit
    let modalDisplay = this.state.modalDisplay
    let guess = this.state.guess

    return (
      <div>
        <div id="header">
          <button id="startButton" className="button" onClick={this.startGame} disabled={this.state.start}> Start Game</button>
          <button id="quitButton" className="button" onClick={this.quitGame} disabled={!this.state.start}>Quit</button>
          <button id="guessButton" className="button" onClick={this.makeGuess} disabled={!this.state.start}>Guess</button>
        </div>
        <div id='modal'>
           
        </div>
        <div id="body">
          <Maplet id="maplet" zoom={this.state.zoom} markerPosition={this.state.markerPosition} startPosition={this.state.startPosition} />

          <div id="menu">
          <button id="returnButton" className="button" onClick={this.returnPosition}>Return</button>
            <div id="gridForDirectionalButtons">
              <button id="westButton" className="button" onClick={this.moveWest}>West</button>
              <button id="northButton" className="button" onClick={this.moveNorth}>North</button>
              <button id="southButton" className="button" onClick={this.moveSouth}>South</button>
              <button id="eastButton" className="button" onClick={this.moveEast}>East</button>
            </div>
            {/* // if give up clicked or user guessed correctly, give the markerPosition, county, and town */}
            {((quit)||(guess)) && 
              <Infopanel markerPosition={this.state.markerPosition}
                county={this.state.county} town={this.state.town}
                score={this.state.score}
              />}

            {/* // if give up button not clicked, all areas post '?' marks  */}
            {((!quit) && (!guess))  &&
              <Infopanel lat={'?'} lng={'?'}
                county={'?'} town={'?'} />}
                score={this.state.score}
          </div>

        </div>

      </div>
    )
  }
}

export default App;

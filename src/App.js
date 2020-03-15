import React from 'react';
import L from 'leaflet';
import LeafletPip from 'leaflet-pip';
import borderData from './border.js';
import ReactDOM from 'react-dom';

// ----------React Components---------------------------//
import Maplet from './Map.js';
import './App.css';
import Infopanel from './Infopanel.js'
<<<<<<< HEAD
import Modal from './Modal.js'
=======
>>>>>>> sunday

// Variable Declaration-------------------------------

let randLat;
let randLng;
let layerArray;

class App extends React.Component {
  constructor(props) {
    super(props)

    //setting the state
    this.state = {
      start: false,
      quit: false,
      guess: false,
      zoom: 8,
      vtBorder: L.geoJSON(borderData),
      centerView: { lat: 44.0886, lng: -72.7317 },
      initialPoint: { lat: 44.0886, lng: -72.7317 },
      score: 100,
      markerPosition: { lat: 44.0886, lng: -72.7317 },
      pathArray: [],
<<<<<<< HEAD
      county: [],
=======
>>>>>>> sunday
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
      centerView: { lat: randLat, lng: randLng },
      initialPoint: { lat: randLat, lng: randLng }
    })


    this.setState(state => {
      let pathArray = state.pathArray.concat(state.centerView)
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
      centerView: { lat: randLat, lng: randLng },
      initialPoint: { lat: randLat, lng: randLng }
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
    this.setState({
      centerView: {
        lat: this.state.centerView.lat + .002,
        lng: this.state.centerView.lng
      },
      score: this.state.score - 1,
    });
    console.log(this.state.score)

    this.setState(state => {
      let pathArray = state.pathArray.concat(state.centerView)
      return {
        pathArray
      }
    })
  }

  moveSouth = () => {
    this.setState({
      centerView: {
        lat: this.state.centerView.lat - 0.002,
        lng: this.state.centerView.lng
      },
      score: this.state.score - 1,
    });
    console.log(this.state.score);
    this.setState(state => {
      let pathArray = state.pathArray.concat(state.centerView)
      return {
        pathArray
      }
    })
  }

  moveEast = () => {
    this.setState({
      centerView: {
        lat: this.state.centerView.lat,
        lng: this.state.centerView.lng + 0.0025
      },
      score: this.state.score - 1,
    });
    console.log(this.state.score);
    this.setState(state => {
      let pathArray = state.pathArray.concat(state.centerView)
      return {
        pathArray
      }
    })
  }

  moveWest = () => {
    this.setState({
      centerView: {
        lat: this.state.centerView.lat,
        lng: this.state.centerView.lng - 0.0025
      },
      score: this.state.score - 1,
    });
    console.log(this.state.score);

    this.setState(state => {
      let pathArray = state.pathArray.concat(state.centerView)
      return {
        pathArray
      }
    })
  }

<<<<<<< HEAD
  //-------when player clicks guess button------------
=======
//-------when player clicks guess button------------
>>>>>>> sunday

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
    let guess = this.state.guess
    let initialPoint = this.state.initialPoint

    return (
      <div>
        <div id="header">
          <button id="startButton" className="button" onClick={this.startGame} disabled={this.state.start}> Start Game</button>
          <button id="quitButton" className="button" onClick={this.quitGame} disabled={!this.state.start}>Quit</button>
          <button id="guessButton" className="button" onClick={this.makeGuess} disabled={!this.state.start}>Guess</button>
        </div>
<<<<<<< HEAD

=======
        <div id='modal'>
           
        </div>
>>>>>>> sunday
        <div id="body">
          <Maplet id="maplet" vtBorder={this.state.vtBorder} zoom={this.state.zoom} markerPosition={this.state.markerPosition} centerView={this.state.centerView} initialPoint={this.state.initialPoint} />

          <div id="menu">
<<<<<<< HEAD

=======
          <button id="returnButton" className="button" onClick={this.returnPosition}>Return</button>
>>>>>>> sunday
            <div id="gridForDirectionalButtons">
              <button id="westButton" className="button" onClick={this.moveWest}>West</button>
              <button id="northButton" className="button" onClick={this.moveNorth}>North</button>
              <button id="southButton" className="button" onClick={this.moveSouth}>South</button>
              <button id="eastButton" className="button" onClick={this.moveEast}>East</button>
            </div>
            <div id='modal'>
              <Modal modalDisplay={this.state.modalDisplay} />
            </div>
            {/* // if give up clicked or user guessed correctly, give the markerPosition, county, and town */}
            {((quit) || (guess)) &&
              <Infopanel lat={this.state.initialPoint.lat.toFixed(4)} lng={this.state.initialPoint.lng.toFixed(4)}
                county={this.state.county} town={this.state.town}
                score={this.state.score}
              />}

            {/* // if give up button not clicked, all areas post '?' marks  */}
            {((!quit) && (!guess)) &&
              <Infopanel  lat={'?'} lng={'?'} county={'?'} town={'?'} />}
                score={this.state.score}
          </div>

        </div>

      </div>
    )
  }

}

export default App;

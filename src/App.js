import React from 'react';
import Modal from 'react-modal'
import L from 'leaflet';
import LeafletPip from 'leaflet-pip';
import borderData from './border.js';
import ReactDOM from 'react-dom';
// React Components ^ ^ ^ ------------------------

import Maplet from './Map.js';
import './App.css';
import Infopanel from './Infopanel.js'
import pageModal from './Modal.js'

Modal.setAppElement(pageModal)

// Variable Declaration --------------------------

let randLat;
let randLng;
let layerArray;
let pathArray;
 
class App extends React.Component {
  constructor(props) {
    super(props)

    //----Setting the State-------------------------------------
    
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
      county: [],
      town: [],
      modalDisplay: false,
      correctGuess: false,
      countyGuess: false
    }
  }
  //---------------------------------------------------------------------------------//


  // Function to pick random coordinates and verify within VT-----------------

  checkValidCoord = () => {
    let randLat = Math.random() * (45.005419 - 42.730315) + 42.730315
    let randLng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1
    let layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));

    //this runs when the random coordinate is not within VT--------
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

    //retrieves the county and town from the rand lat and long--------
    
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${randLat}&lon=${randLng}&format=json`)
      .then(data => data.json())
      .then(jsonObj => {
        let town;
        if (jsonObj.address.city) {
          town = jsonObj.address.city
        } else if (jsonObj.address.town) {
          town = jsonObj.address.town
        } else if (jsonObj.address.village) {
          town = jsonObj.address.village
        } else if (jsonObj.address.hamlet) {
          town = jsonObj.address.hamlet
        }
        this.setState({
          county: jsonObj.address.county,
          town: town
        })
      })
  }
  //------------------------------------------------------------------------------//


  // When player starts the game--------------------------

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
  }


  //---------------------------------------------------------------------------------------//



  //Direction Button Functions------------------------------------------------------------//
  
  moveNorth = () => {
    this.setState({
      centerView: {
        lat: this.state.centerView.lat + .002,
        lng: this.state.centerView.lng
      },
      score: this.state.score - 1,
      pathArray: [this.lat, this.lng]
    });
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
      pathArray: [this.lat, this.lng]
    });
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
      pathArray: [this.lat, this.lng]
    });
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
      pathArray: [this.lat, this.lng]
    });
 // Direction Buttons end -----------------------------
    this.setState(state => {
      let pathArray = state.pathArray.concat(state.centerView)
      return {
        pathArray
      }
    })
  }

  //---------------------------------------------------------------------------------------------------//



  //----Button Functions---------------------------------------------------------------------------

  //-------when player clicks guess button------------------//

  makeGuess = () => {
    this.setState({
      modalDisplay: true,
      guess: true
    })
  }

  //checks their selection against the actual county------//
  confirmGuess = event => {
    event.preventDefault()
    // checks if the county guess is the same as the county
    if (this.state.county.includes(this.state.countyGuess)) {
      this.subtitle.textContent = 'You are correct & awarded 50 points!'
      this.setState({
        correctGuess: true,
        start: false,
        score: this.state.score + 50
      })
      this.endModal(event);
    } else {
      this.subtitle.textContent = 'Nope - not there, you lost 10 points - Guess again'
      this.setState({
        score: this.state.score - 10,
        correctGuess: false,
        guess: false
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      countyGuess: event.target.value
    });
  }



  //-------When player clicks quit button--------------------------
  quitGame = () => {
    this.setState({
      start: false,
      quit: true,
      guess: false
    })
    setTimeout(() => { window.location.reload(); }, 2500);
  }

  //-----When user clicks return button, takes them back to starting spot-----------
 
    returnPosition = () => {
    this.setState({
      centerView: this.state.initialPoint
    })
  }
  //-----------------------------------------------------------------------------------------//


  //Modal functions-Not Currently Working---------------------------
  //displays modal----------
  showModal = () => {
    this.setState({
      modalDisplay: true
    })
}

  // //closes modal-----------
  // endModal = (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     modalDisplay: false,
  //   });
  // }

  //--------------------------------------------------------------------------------------------//

  render() {
    let quit = this.state.quit
    let initialPoint = this.state.initialPoint
    let correctGuess = this.state.correctGuess

    return (
      <div>
        <div id="header">
          <button id="startButton" className="button" onClick={this.startGame} disabled={this.state.start}> Start Game</button>
          <button id="quitButton" className="button" onClick={this.quitGame} disabled={!this.state.start}>Quit</button>
          <button id="guessButton" className="button" onClick={this.makeGuess} disabled={!this.state.start}>Guess</button>
        </div>

        <div id="body">
          <Maplet id="maplet" vtBorder={this.state.vtBorder} zoom={this.state.zoom} markerPosition={this.state.markerPosition} centerView={this.state.centerView} initialPoint={this.state.initialPoint} />
          <div id="menu">

            <button id="returnButton" className="button" onClick={this.returnPosition}>Return</button>
            <div id="gridForDirectionalButtons">
              <button id="westButton" className="button" onClick={this.moveWest}>West</button>
              <button id="northButton" className="button" onClick={this.moveNorth}>North</button>
              <button id="southButton" className="button" onClick={this.moveSouth}>South</button>
              <button id="eastButton" className="button" onClick={this.moveEast}>East</button>
            </div>
            <h2>Geo-Vermonter - How Well Do You Know Vermont?</h2>
            <div id='modal'></div>
            <pageModal modalDisplay={this.state.modalDisplay} showModal={this.showModal} endModal={this.endModal} />

            {/* // if give up clicked or user guessed correctly, give the markerPosition, county, and town */}
            {
              ((quit) || (correctGuess)) &&
              <Infopanel lat={this.state.initialPoint.lat.toFixed(4)} lng={this.state.initialPoint.lng.toFixed(4)}
                county={this.state.county} town={this.state.town} />
            }
      score = {this.state.score}

            {/* // if give up button not clicked, all areas post '?' marks  */}
            {
              ((!quit) && (!correctGuess)) &&
              <Infopanel lat={'?'} lng={'?'} county={'?'} town={'?'}
                score={this.state.score}
              />
            }
          </div>
        </div >
      </div >
    )
  }
}
export default App;

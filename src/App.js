import React from 'react';
import Modal from './Modal'
import L from 'leaflet';
import LeafletPip from 'leaflet-pip';
import borderData from './border.js';

// React Components ^ ^ ^ ------------------------

import Maplet from './Map.js';
import './App.css';
import Infopanel from './Infopanel.js'

//Modal.setAppElement(Modal)

// Variable Declaration --------------------------

let randLat;
let randLng;

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
      countyGuess: false,
      pathArray: []
    }
  }
  //--------------------------------------------------------------

  // Func to pick random coords and verify if coords within VT ---

  checkValidCoord = () => {
    let randLat = Math.random() * (45.00541896831666 - 42.730315121762715) + 42.730315121762715
    let randLng = (Math.random() * (71.51022535353107 - 73.35218221090553) + 73.35218221090553) * -1;
    let layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));

    // this runs when the random coordinate is not within VT--------
    while (layerArray.length === 0) {
      randLat = Math.random() * (45.00541896831666 - 42.730315121762715) + 42.730315121762715
      randLng = (Math.random() * (71.51022535353107 - 73.35218221090553) + 73.35218221090553) * -1
      layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));
    }
      console.log(randLat)
      console.log(randLng)
      console.log(layerArray.length)
    this.setState({
      centerView: { lat: randLat, lng: randLng },
      initialPoint: { lat: randLat, lng: randLng }
    })

    // below adds coords to state to later be used in polyline
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
        console.log(jsonObj)
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
      initialPoint: { lat: randLat, lng: randLng },
      pathArray: [],
      modalDisplay: false,
      correctGuess: false,
      countyGuess: false
    })
    this.checkValidCoord()
  }

    //------------------------------------------------------------------------------//

  //Direction Button Functions------------------------------------------------------//
  // each will reduce player score by 1pt with each movement
  //---------------------------------------------------------------------------------------//

  moveNorth = () => {
    this.setState({
      centerView: {
        lat: this.state.centerView.lat + .002,
        lng: this.state.centerView.lng
      },
      score: this.state.score - 1,
      pathArrayVar: [this.lat, this.lng]
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
      pathArrayVar: [this.lat, this.lng]
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
      pathArrayVar: [this.lat, this.lng]
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
      pathArrayVar: [this.lat, this.lng]
    });
    // Direction Buttons end -----------------------------
    this.setState(state => {
      let pathArray = state.pathArray.concat(state.centerView)
      return {
        pathArray
      }
    })
  }

  //------------------------------------------------------------------------------//

  //---- Button Functions------------------------------------

  //------- when player clicks guess button ------------------//

  makeGuess = (event) => {
    this.setState({
      //modalDisplay: true,
      guess: true
    })
    this.confirmGuess()
  }

  //checks their selection against the actual county ------//
  confirmGuess = (event) => {
    // checks if the county guess is the same as the county
    if (this.state.county.includes(this.state.countyGuess)) {
      alert('You are correct & awarded 50 points!')
      this.setState({
        correctGuess: true,
        start: false,
        score: this.state.score + 50
      })
      this.closeModal(event);
      setTimeout(() => { window.location.reload(); }, 1500)
    } else {
      alert ('Nope - not there, you lost 10 points - Guess again')
      this.setState({
        score: this.state.score - 10,
        correctGuess: false,
        guess: false
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      modalDisplay: event.target.value,
      countyGuess: event.target.value
    });
    this.confirmGuess()
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
   //------------------------------------------------------------------------------//

 
  //Modal functions-----------------------------------
  //displays modal----------
  openModal = (event) => {
    this.setState({
      modalDisplay: true
    })
  }

  // //closes modal-----------
  closeModal = (event) => {
    this.setState({
      modalDisplay: false,
    });
  }

  //------------------------------------------------------------------------------//

  render() {
    let quit = this.state.quit
    let initialPoint = this.state.initialPoint
    let correctGuess = this.state.correctGuess
    let countyGuess = this.state.countyGuess

    return (
      <div>
        <div id="header">
          <button id="startButton" className="button" onClick={this.startGame} disabled={this.state.start}> Start Game</button>
          <button id="quitButton" className="button" onClick={this.quitGame} disabled={!this.state.start}>Quit</button>
          <button id="guessButton" className="button" onClick={this.openModal} openModal={this.openModal} modalDisplay={this.state.modalDisplay} handleChange={this.handleChange} showModal={this.showModal} disabled={!this.state.start}>Guess</button>
          <h1> Geo-Vermonter</h1>``
        </div>

        <div id="body">
          
          <Maplet id="maplet" vtBorder={this.state.vtBorder} zoom={this.state.zoom} markerPosition={this.state.markerPosition} centerView={this.state.centerView} initialPoint={this.state.initialPoint} pathArray={this.state.pathArray}> 
          </Maplet>
          <div id="menu">
          <Modal handleChange={this.handleChange} modalDisplay={this.state.modalDisplay} closeModal={this.closeModal} />
            <button id="returnButton" className="button" onClick={this.returnPosition}>Return</button>
            <div id="gridForDirectionalButtons">
              <button id="westButton" className="button" onClick={this.moveWest}>West</button>
              <button id="northButton" className="button" onClick={this.moveNorth}>North</button>
              <button id="southButton" className="button" onClick={this.moveSouth}>South</button>
              <button id="eastButton" className="button" onClick={this.moveEast}>East</button>
            </div>
            <div id="infopanel">
            {/* // if give up clicked or user guessed correctly, give the markerPosition, county, and town */}
            {
              ((quit) || (correctGuess)) &&
              <Infopanel lat={this.state.initialPoint.lat.toFixed(4)} lng={this.state.initialPoint.lng.toFixed(4)}
                county={this.state.county} town={this.state.town}> 
                </Infopanel>
            }score = {this.state.score}
            </div>
            {/* // if give up button not clicked, all areas post '?' marks  */}
            <div id="subpanel">
            {((!quit) && (!correctGuess)) &&
              <Infopanel lat={'?'} lng={'?'} county={'?'} town={'?'}
                score={this.state.score}/>}
              </div>
          </div>
        </div >
      </div >
    )
  }
}
export default App;

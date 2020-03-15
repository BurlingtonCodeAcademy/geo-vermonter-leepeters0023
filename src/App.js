import React from 'react';
import L from 'leaflet';
import LeafletPip from 'leaflet-pip';
import Maplet from './Map.js';
import './App.css';
import borderData from './border.js'
import Infopanel from './Infopanel.js'
import countyData from './vtCountyPolygons'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: false,
      quit: false,
      zoom: 8,
      borderLayer: L.geoJSON(borderData),
      center: { lat: 44.0886, lng: -72.7317 },
      score: 100,
      startPoint: { lat: undefined, lng: undefined },
      markerPosition: { lat: 44.0886, lng: -72.7317 },
      modalDisplayed: false,
      pathArray: [],//breadcrumbs
      counties: [],
      town: []
    }
  }

  // counties func -------------------------------
  componentDidMount() {
    fetch(countyData)
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



  // Function to pick random coordinates and verify within VT-----------------

  checkValidCoord = () => {
    let randLat = Math.random() * (45.005419 - 42.730315) + 42.730315
    let randLng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1
    let layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));

    console.log(App.counties, 'this shit works')

    //If random coordinate is not within VT--------
    while (layerArray.length === 0) {
      let randLat = Math.random() * (45.005419 - 42.730315) + 42.730315
      let randLng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1
      layerArray = LeafletPip.pointInLayer([randLng, randLat], L.geoJSON(borderData));
    }

    this.setState({
      startPoint: { lat: randLat, lng: randLng },
      markerPosition: { lat: randLat, lng: randLng }
    })


    this.setState(state => {
      let pathArray = state.pathArray.concat(state.startPoint)
      return {
        pathArray
      }
    });

  }

  //When player starts the game--------------------------

  startGame = () => {

    this.setState({
      start: true,
      quit: false,
      score: 100,
      zoom: 18,
    })

    this.checkValidCoord()
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

  //------------------------


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
      quit: true
    })
    // info panel displays randomNum
    // and correct town & county is displayed
    // setTimeout(3000, resets page)

  }

  render() {
    let quit = this.state.quit
    return (
      <div>
        <div id="header">
          <button id="startButton" className="button" onClick={this.startGame} disabled={this.state.start}> Start Game</button>
          <button id="quitButton" className="button" onClick={this.quitGame} disabled={!this.state.start}>Quit</button>
          <button id="guessButton" className="button" onClick={this.makeGuess} disabled={!this.state.start}>Guess</button>
        </div>
        <div id="body">
          <Maplet id="maplet" zoom={this.state.zoom} markerPosition={this.state.markerPosition} />
          <div id="menu">
            <div id="gridForDirectionalButtons">
              <button id="westButton" className="button" onClick={this.moveWest}>West</button>
              <button id="northButton" className="button" onClick={this.moveNorth}>North</button>
              <button id="southButton" className="button" onClick={this.moveSouth}>South</button>
              <button id="eastButton" className="button" onClick={this.moveEast}>East</button>
            </div>
            {/* // if give up clicked or user guessed correctly, give the markerPosition, county, and town */}
            {(quit) &&
              <Infopanel markerPosition={this.state.markerPosition}
                county={this.state.county} town={this.state.town}
                score={this.state.score}
              />}
            
            {/* // if give up button not clicked, all areas post '?' marks  */}
            { (!quit) &&
              <Infopanel markerPosition={{ lat: '?', lng: '?' }}
                county={'?'} town={'?'} />}
                score={this.state.score}
          </div>

        </div>

      </div>
    )
  }
}

export default App;

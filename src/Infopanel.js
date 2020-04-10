import React, { Component } from 'react'

class Infopanel extends Component {

    constructor(props) {
        super(props)
    }
   
    
    render() {
        let lat = this.props.lat
        let lng = this.props.lng
        let town = this.props.town
        let county = this.props.county
        
  
        return (//this is ready for when we fetch the information
            <div>
                
                { `You are at: ${lat} degrees, and ${lng} degrees.
                   In VT County of: ${county}
                   In the VT Town of: ${town} `}
            </div>
        )
    }
}

export default Infopanel

import React, { Component } from 'react'

class Infopanel extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount(){}
    
    render() {
        let lat = this.props.lat
        let lng = this.props.lng;
        let town = this.props.town
        let county = this.props.county;
  
        return (//this is ready for when we fetch the information
            <div>
                {`| Latitude: ${lat} | Longitude: ${lng} | VT County: ${county} | VT Town: ${town} |`}
            </div>
        )
    }
}

export default Infopanel

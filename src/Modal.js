import React, { Component } from 'react'

class pageModal extends Component {
  constructor(props) {
    super(props);
  }

  //to prevent the default behaviour of element
  prevent(event) {
    event.preventDefault()
  }

  render() {
    if (this.props.guess) {
      return (
        <div>
          <select name="counties" value={this.props.guess} >
            <option value="Addison">Addison</option>
            <option value="Bennington">Bennington</option>
            <option value="Caledonia">Caledonia</option>
            <option value="Chittenden">Chittenden</option>
            <option value="Essex">Essex</option>
            <option value="Franklin">Franklin</option>
            <option value="Grand Isle">Grand Isle</option>
            <option value="Lamoille">Lamoille</option>
            <option value="Orleans">Orleans</option>
            <option value="Orange">Orange</option>
            <option value="Rutland">Rutland</option>
            <option value="Washington">Washington</option>
            <option value="Windsor">Windsor</option>
            <option value="Windham">Windham</option>
          </select>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}

export default pageModal



import React, { Component } from 'react'

class pageModal extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    console.log(this.props.modalDisplay)

    if (this.props.modalDisplay) {
      return (
        <div id="modal">
          <h2> Do You Know Which County You Are In?</h2>
          <button id='cancelButton' onClick={this.props.closeModal} closeModal={this.closeModal} modalDisplay={this.props.modalDisplay}>Cancel That</button>
          <form > <div>
            <select name="counties" value={this.props.guess} onChange={this.props.handleChange} >
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
              <option value="Windham">Windham</option>
              <option value="Windsor">Windsor</option>
            </select>
          </div></form>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}

export default pageModal



import React from 'react'

class Modal extends React.Component {

  render() {
    return (
      <div>
        {(this.props.modalDisplay) ?
          <div id="modal">
            <h2> Do You Know Which County You Are In?</h2>
            <button id='cancelButton' className="button" onClick={this.props.closeModal} closeModal={this.closeModal} modalDisplay={this.props.modalDisplay}>Cancel That</button>
            <form >
              <div>
                <select class="dropdown" name="counties" value={this.props.countyGuess} onChange={this.props.handleChange} >
                  <option value="Addison County">Addison</option>
                  <option value="Bennington County">Bennington</option>
                  <option value="Caledonia County">Caledonia</option>
                  <option value="Chittenden County">Chittenden</option>
                  <option value="Essex County">Essex</option>
                  <option value="Franklin County">Franklin</option>
                  <option value="Grand Isle County">Grand Isle</option>
                  <option value="Lamoille County">Lamoille</option>
                  <option value="Orange County">Orange</option>
                  <option value="Orleans County">Orleans</option>
                  <option value="Rutland County">Rutland</option>
                  <option value="Washington County">Washington</option>
                  <option value="Windham County">Windham</option>
                  <option value="Windsor County">Windsor</option>
                </select>
              </div>
            </form>
          </div> : null}
      </div>
    )
  }
}


export default Modal



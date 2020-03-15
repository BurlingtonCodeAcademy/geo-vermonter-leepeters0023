import React, { Component } from 'react'

class Modal extends Component {


    render() {
        if (this.props.modalDisplay) {
            return (
                <div id="modal">
                    [Addison, Bennington, Caledonia, Chittenden, Essex, Franklin, Grand Isle,
                     Lamoille, Orleans, Orange, Rutland, Washington, Windham, Windsor]
        </div>
        )
      } else {
        return <div />
      }
  }
}

export default Modal

              

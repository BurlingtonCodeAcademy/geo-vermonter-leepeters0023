import React, { Component } from 'react'

class Modal extends Component {

constructor(props){
    super(props)
}
    render() {
        if (this.props.modalDisplayed) {
            return (
                <div id="modal">
                    A bunch of stuff
                </div>
            )
        } else {
            return <div />
        }
    }

}

export default Modal

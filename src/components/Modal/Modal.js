import React from 'react'
import "./Modal.css";

const Modal = (props) => {
  return (
    <dialog id={props.id}>
      <div className="containter">
        <div className="header">
          Confirmation
        </div>
        <div className="content">
          Do you want to {props.id} this?
        </div>
        <div className='block'>
          <button className="confirm"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflow = "scroll"
              document.getElementById(props.id).close()
              props.callBack();
            }}
          >
            Confirm
          </button>

          <button className="cancel"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflow = "scroll"
              document.getElementById(props.id).close()
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  )


}
export default Modal;

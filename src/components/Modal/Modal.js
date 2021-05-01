import React from 'react'
import { Trans } from "react-i18next";
import "./Modal.css";

const Modal = (props) => {

  return (
    <dialog id="approveModal">
      <div className="containter">
        <div className="header">
          Confirmation
        </div>


        <div className="content">
          Do you want to approve this
        </div>

        <div className='block'>
          <button className="confirm"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflow = "scroll"
              document.getElementById('approveModal').close()
              props.approveCampaign()
            }}
          >
            Confirm
          </button>

          <button className="cancel"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflow = "scroll"
              document.getElementById('approveModal').close()
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

import React from 'react'
import { Trans } from "react-i18next";
import "./ApproveCampaign.css";

const ApproveCampaignModal = (props) => {

  return (
    <dialog id="approveModal">
      {/* className="h-64 w-11/12 lg:w-4/5 md:w-4/5 sm:w-11/12 p-5  bg-white rounded-md overflow-y-hidden border-none"> */}

      {/* <div className="flex flex-col w-full h-auto "> */}
      <div className="containter">
        {/*Header*/}
        {/* <div className="flex w-full h-auto justify-center items-center"> */}
        {/* <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold"> */}
        <div className="header">
          Confirmation
        </div>
        {/* <div onClick={() => {
            document.getElementsByTagName('body')[0].style.overflow = "scroll"
            document.getElementById('approveModal').close()
          }}
            className="flex w-1/12 h-auto justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#000000"
              className="feather feather-x">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div> */}
        {/*Header End*/}
        {/* </div> */}
        {/*Modal*/}
        {/* <div className="container mx-auto md:p-8">
          <div className="text-center"> */}
        {/* <div className="text-2xl block mb-8"> */}
        <div className="content">
          Do you want to approve this
        </div>

        <div className='block'>
          {/* <button className="rounded text-red-800 py-2 px-4 mx-4" */}
          <button className="confirm"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflow = "scroll"
              document.getElementById('approveModal').close()
              props.approveCampaign()
            }}
          >
            <Trans>Confirm</Trans>
          </button>

          {/* <button className="rounded text-gray-900 bg-gray-100 py-2 px-4 mx-4" */}
          <button className="cancel"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflow = "scroll"
              document.getElementById('approveModal').close()
            }}
          >
            <Trans>Cancel</Trans>
          </button>
        </div>
      </div>
      {/* </div>
      </div> */}
    </dialog>
  )


}
export default ApproveCampaignModal;

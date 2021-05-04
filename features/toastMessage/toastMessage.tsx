import React from "react";
import { toast } from "react-toastify";

const toastMessage = (messages: Array<string>, messageType: string = 'default') => {
  if (messageType === 'error') {
    toast.error(() => (
      <div>
        {messages.map((message, index) => <div key={index} className="m-2 text-white">{message}</div>)}
      </div>
      ), {autoClose: false}
    )
  } else if (messageType === 'success') {
    toast.success(() => <div>
      {messages.map((message, index) => <div key={index} className="m-2 text-white">{message}</div>)}
    </div>)
  } else {
    toast(() => <div>
      {messages.map((message, index) => <div key={index} className="m-2 text-gray-500">{message}</div>)}
    </div>)
  }
}
export default toastMessage

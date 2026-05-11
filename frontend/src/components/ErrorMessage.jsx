import React from "react";
const ErrorMessage = ({ message}) => {
  return (
    <div className=" bg-red-500/20 border border-red-500 text-red-400 p-4rounded-xl">
      {message}
    </div>

  );

};

export default ErrorMessage;
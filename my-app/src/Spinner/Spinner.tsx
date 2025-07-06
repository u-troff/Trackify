
import React, {useState}from "react";
import type {CSSProperties} from "react"
import {ClipLoader} from 'react-spinners'
import "../css/Spinner.css"

interface Props{
    isLoading?: boolean;
};


const Spinner = ({isLoading =true}:Props)=>{
    

  return (
    <>
      <div id="loading-spinner">
        <ClipLoader
          color="#0D13CB"
          loading={isLoading}
          size={50}
          data-testid="loader"
        />
      </div>
    </>
  );
}

export {Spinner};

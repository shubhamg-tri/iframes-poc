import React, { useState, useEffect } from "react";
import {communicationHandler, useParentFunction} from './helper.js'
import "./styles/styles.css";


export default function Home() {
  const [message, setMessage] = React.useState("");
  const {response, call} = useParentFunction()
  return (
    <main role="main" className="wrapper">
      <div className="content">
        <p>{response.data || response.error}</p>
        <button onClick={()=>call({action: "generateTFN"})}>Generate TFN !</button>
      </div>
    </main>
  );
}

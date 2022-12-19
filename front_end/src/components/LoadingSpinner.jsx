import React from "react";
import "../App.css";

export default function LoadingSpinner() {
  return (
    <>
        <h4>Fetching Latest Items from League. This may take a minute.</h4>
        <div className="spinner-container">
        <div className="loading-spinner">
        </div>
        </div>
    </>
    
  );
}
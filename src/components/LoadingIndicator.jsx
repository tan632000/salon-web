import React from "react";
import "../styles/LoadingIndicator.css";

const LoadingIndicator = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-indicator"></div>
        </div>
    );
};

export default LoadingIndicator;

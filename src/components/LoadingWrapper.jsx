import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";

const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    // Simulating an API call
    startLoading();

    // Replace the setTimeout with your actual API call logic
    setTimeout(() => {
      stopLoading();
    }, 2000);
  }, []);

  return (
    <>
      {isLoading && <LoadingIndicator />} {/* Display loading indicator when isLoading is true */}
      {children}
    </>
  );
};

export default LoadingWrapper;

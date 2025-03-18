import React, { useState, useEffect } from "react";
import "../CSS/Loader.css";
import apostrophe from './Adipose.js';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState(null);

  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      const updateConnectionStatus = () => {
        setNetworkSpeed(connection.downlink);
        setIsOffline(connection.downlink === 0);
      };

      updateConnectionStatus();
      connection.addEventListener("change", updateConnectionStatus);

      return () => {
        connection.removeEventListener("change", updateConnectionStatus);
      };
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      const fetchData = () => {
        setTimeout(() => {
          setIsLoading(false); 
        }, networkSpeed < 1 ? 5000 : 2000); 
      };

      fetchData();
    }
  }, [isLoading, networkSpeed]);

  return (
    <div className="loader_center">
      {isLoading ? (
        <div className="loading-overlay">
          <div className="loader"></div>
          {isOffline ? (
            <>
            <p>You're offline. Please check your network.</p>
            <p>Or there's no threads available</p>
            </>
          ) : (
            <p>Network speed: {networkSpeed} Mbps</p>
          )}
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
}

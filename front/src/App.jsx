import { useEffect, useState } from 'react'

import './App.css'

function App() {
  useEffect(() => {
    const getUserCountry = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const geocodingApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

            // Make an API call to the Reverse Geocoding service
            fetch(geocodingApiUrl)
              .then((response) => response.json())
              .then((data) => {
                const countryName = data.countryName || "Unknown";
                console.log("User country:", countryName);
              })
              .catch((error) => {
                console.error("Error retrieving user country:", error);
              });
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserCountry();
  }, []);



  return (
    <>
      <div>User Country: Check the console for the country name.</div>
    </>
  )
}

export default App

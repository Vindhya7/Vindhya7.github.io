import React from "react";
const MapContainer = () => {
  const mapStyles = {
    height: "50vh",
    width: "100%",
  };

  return (
    <iframe
      style={mapStyles}
      title="MAP"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}
    &q=West+Midtown,NY`}
    />
  );
};
export default MapContainer;

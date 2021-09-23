import React from "react";
import LocationPicker from "../../components/LocationPicker";

const markers = [
  {
    address: "123",
    latitude: 26.743573,
    longitude: 94.2122044,
  },
  {
    address: "cps e",
    latitude: 26.733573,
    longitude: 94.2322044,
  },
  {
    address: "asdf a",
    latitude: 26.732573,
    longitude: 94.2022044,
  },
];

const TesingComponent = () => {
  return (
    <div className="h-screen w-screen bg-purple-600">
      {/* <Map region={[94.2142044, 26.753573]} markers={markers} /> */}
      <LocationPicker
        region={[94.2142044, 26.753573]}
        onCordinateChange={() => {
          console.log("yay");
        }}
        onRGCResponse={(name) => {
          console.log(name);
          alert(name);
        }}
      />
    </div>
  );
};

export default TesingComponent;

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./style.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmctNDA0IiwiYSI6ImNrczk5eG8yZzF1dmgydnBoZWgwNjZzZ2QifQ.hrxTaZwJoKGMxstCagV5zw";

const Map = ({ region, markers, center }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(94.2122044);
  const [lat, setLat] = useState(26.743573);
  // const [center, setCenter] = useState([94.2122044, 26.743573]);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    setLng(region[0]);
    setLat(region[1]);
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    console.log(markers);
  });
  
  useEffect(() => {
    if (markers)
      markers.map((marker) => {
        const el = document.createElement("div");
        el.setAttribute("title", "Reported Area");
        el.className = "marker-custom";
        new mapboxgl.Marker(el)
          .setLngLat([marker.longitude, marker.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h3>Hello</h3><p>${marker.address}</p>`)
          )
          .addTo(map.current);
      });
  }, [markers]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    if (center)
      map.current.on("dragend", () => {
        center[1]([
          map.current.getCenter().lng.toFixed(4),
          map.current.getCenter().lat.toFixed(4),
        ]);
      });
  });

  return <div ref={mapContainer} className="map-container" />;
};

export default Map;

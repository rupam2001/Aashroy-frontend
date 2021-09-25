import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./style.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmctNDA0IiwiYSI6ImNrczk5eG8yZzF1dmgydnBoZWgwNjZzZ2QifQ.hrxTaZwJoKGMxstCagV5zw";

const Map = ({ region, markers, center, pins, regionColor, customPopup }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(94.2122044);
  const [lat, setLat] = useState(26.743573);
  // const [center, setCenter] = useState([94.2122044, 26.743573]);
  const [zoom, setZoom] = useState(13);

  const [currentMarkers, setCurrentMarkers] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    setLng(region[0]);
    setLat(region[1]);
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [region[0], region[1]],
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  });

  useEffect(() => {
    map.current.flyTo({ center: [region[0], region[1]], essential: true });
  }, [region]);

  const clearMarkers = () => {
    currentMarkers.forEach((marker) => marker.remove());
  };

  useEffect(() => {
    clearMarkers();
    let tempMarkers = [];
    if (markers)
      markers.map((marker) => {
        const el = document.createElement("div");
        el.setAttribute("title", "Reported Area");
        el.className = "marker-custom";
        if (regionColor) el.style.backgroundColor = regionColor;
        else el.style.backgroundColor = "#0059ff75";
        let newMarker = new mapboxgl.Marker(el)
          .setLngLat([marker.longitude, marker.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                customPopup ? customPopup(marker) : `<p>${marker.address}</p>`
              )
          )
          .addTo(map.current);
        tempMarkers.push(newMarker);
      });
    setCurrentMarkers(tempMarkers);
  }, [markers]);

  useEffect(() => {
    if (pins)
      pins.map((pin) => {
        new mapboxgl.Marker()
          .setLngLat([pin.longitude, pin.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h3></h3><p>${pin.address}</p>`)
          )
          .addTo(map.current);
      });
  }, [pins]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(7));
      setLat(map.current.getCenter().lat.toFixed(7));
      setZoom(map.current.getZoom().toFixed(2));
    });

    if (center)
      map.current.on("dragend", () => {
        center[1]([
          map.current.getCenter().lng.toFixed(7),
          map.current.getCenter().lat.toFixed(7),
        ]);
      });
  }, []);

  return <div ref={mapContainer} className="map-container" />;
};

export default Map;

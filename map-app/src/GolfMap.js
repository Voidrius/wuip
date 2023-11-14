import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "./golf_courses.json";
import L from "leaflet";

// This part is to fix missing marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function GolfMap() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(data.courses);
  }, []);

  const position = [62, 26];
  const zoom = 7;

  const markers = courses.map((course, index) => (
    <Marker position={[course.lat, course.lng]} key={index}>
      <Popup>
        <b>{course.course}</b>
        <br />
        {course.address}
        <br />
        {course.phone}
        <br />
        {course.email}
        <br />
        <a href={course.web} target="_blank" rel="noopener noreferrer">
          {course.web}
        </a>
        <br />
        <br />
        <i>{course.text}</i>
      </Popup>
    </Marker>
  ));

  return (
    <MapContainer center={position} zoom={zoom} className="App">
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}

export default GolfMap;

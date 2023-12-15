import React, { useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from "@react-google-maps/api";
import Places from "./Places";

const Map = () => {
    const [office, setOffice] = useState("");
    const mapRef = useRef();
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
    const options = useMemo(
        () => ({
            mapId: "157dbe9af7fc676e",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const houses = useMemo(() => generateHouses(center), [center]);

    return (
        <div className="container">
            <div className="controls">
                <h1>Commute</h1>
                <Places
                    setOffice={(position) => {
                        setOffice(position);
                        mapRef.current?.panTo(position); /* направляет карту в в эту позицию */
                    }}
                />
            </div>
            <div className="map">
                <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" options={options} onLoad={onLoad}>
                    {office && (
                        <>
                            <Marker
                                position={office}
                                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                            />
                            <MarkerClusterer>
                                {(clusterer) =>
                                    houses.map((house) => (
                                        <Marker
                                            key={house.lat}
                                            position={house}
                                            clusterer={clusterer}
                                            onClick={() => {
                                                fetchDirections(house);
                                            }}
                                        />
                                    ))
                                }
                            </MarkerClusterer>
                            <Circle center={office} radius={15000} options={closeOptions} />
                            <Circle center={office} radius={30000} options={middleOptions} />
                            <Circle center={office} radius={45000} options={farOptions} />
                        </>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};
const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
};
const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
};
const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
};

const generateHouses = (position) => {
    const _houses = [];
    for (let i = 0; i < 100; i++) {
        const direction = Math.random() < 0.5 ? -2 : 2;
        _houses.push({
            lat: position.lat + Math.random() / direction,
            lng: position.lng + Math.random() / direction,
        });
    }
    return _houses;
};

export default Map;

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
                        <Marker
                            position={office}
                            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                        />
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;

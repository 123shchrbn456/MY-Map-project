import React from "react";
import Map from "../components/Map";
import { useLoadScript } from "@react-google-maps/api";

const Home = () => {
    //
    const { isLoaded } = useLoadScript({
        // googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY,
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
};

export default Home;

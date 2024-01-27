import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { CSSProperties, memo, useEffect, useState } from "react";

function Map() {
    const [zoom, setZoom] = useState<number>(15);

    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const style: CSSProperties = {
        width: "100vw",
        height: "100vh",
    };

    const mapCenterPoint: google.maps.LatLngLiteral = {
        lat: 33.745273,
        lng: -117.892191,
    };

    function renderMap() {
        if (!isLoaded) {
            return <h2> Loading </h2>;
        }
        return (
            <GoogleMap
                id="data-example"
                center={mapCenterPoint}
                zoom={zoom}
                mapContainerStyle={style}
            ></GoogleMap>
        );
    }

    return <>{renderMap()}</>;
}

export default memo(Map);

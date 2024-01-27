import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { CSSProperties, memo, useEffect, useState } from "react";

interface AccidentPoint {
    ID: string;
    Severity: number;
    Latitude: number;
    Longitude: number;
}

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

    useEffect(() => {
        async function getAccidentPoints(): Promise<Array<AccidentPoint>> {
            const fetchUrl = new URL("http://127.0.0.1/8000");
            fetchUrl.searchParams.set(
                "user_lat",
                mapCenterPoint.lat.toString(),
            );
            fetchUrl.searchParams.set(
                "user_lng",
                mapCenterPoint.lng.toString(),
            );

            const accidentPointsResponse = await fetch(fetchUrl);
            const accidentPointsJson: Array<AccidentPoint> =
                await accidentPointsResponse.json();

            return accidentPointsJson;
        }

        console.log(getAccidentPoints());
    });

    function renderMap() {
        if (!isLoaded) {
            return <h2> Loading </h2>;
        }
        return (
            <GoogleMap
                id="map-element"
                center={mapCenterPoint}
                zoom={zoom}
                mapContainerStyle={style}
            ></GoogleMap>
        );
    }

    return <>{renderMap()}</>;
}

export default memo(Map);

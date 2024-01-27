import {
    GoogleMap,
    HeatmapLayerF,
    Libraries,
    Marker,
    useLoadScript,
} from "@react-google-maps/api";
import { CSSProperties, memo, useEffect, useRef, useState } from "react";

interface AccidentPoint {
    ID: string;
    Severity: number;
    Latitude: number;
    Longitude: number;
}

const style: CSSProperties = {
    width: "100vw",
    height: "100vh",
};

async function getAccidentPoints(
    centerPoint: google.maps.LatLngLiteral,
): Promise<Array<AccidentPoint>> {
    const fetchUrl = new URL("http://127.0.0.1:8000/nearby_accidents");
    fetchUrl.searchParams.set("user_lat", centerPoint!.lat.toString());
    fetchUrl.searchParams.set("user_lng", centerPoint!.lng.toString());

    const accidentPointsResponse = await fetch(fetchUrl);
    const accidentPointsJson: Array<AccidentPoint> =
        await accidentPointsResponse.json();

    return accidentPointsJson;
}

const googleMapsLibraries: Libraries = ["places", "visualization"];

function Map() {
    const [zoom, setZoom] = useState<number>(15);
    const [centerPoint, setCenterPoint] =
        useState<google.maps.LatLngLiteral | null>(null);
    const [accidentPoints, setAccidentPoints] = useState<AccidentPoint[]>([]);

    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: googleMapsLibraries,
    });

    useEffect(() => {
        if (!centerPoint) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenterPoint({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (_error) => {},
                { timeout: 30000 },
            );
        }

        if (centerPoint && accidentPoints.length === 0) {
            getAccidentPoints(centerPoint).then((accidentPoints) => {
                setAccidentPoints(accidentPoints);
            });
        }
    });

    function renderMarkers() {
        return accidentPoints.map((accidentPoint) => (
            <Marker
                position={{
                    lat: accidentPoint.Latitude,
                    lng: accidentPoint.Longitude,
                }}
            />
        ));
    }

    function renderHeatmap() {
        return (
            <HeatmapLayerF
                data={accidentPoints.map(
                    (point) =>
                        new google.maps.LatLng(point.Latitude, point.Longitude),
                )}
            />
        );
    }

    function renderMap() {
        if (!isLoaded) {
            return <h2> Loading </h2>;
        }
        return (
            <GoogleMap
                id="map-element"
                center={centerPoint!}
                zoom={zoom}
                mapContainerStyle={style}
            >
                {accidentPoints.length !== 0 && renderHeatmap()}
            </GoogleMap>
        );
    }

    return <>{renderMap()}</>;
}

export default memo(Map);

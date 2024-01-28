import { GoogleMap, HeatmapLayerF, Libraries, useLoadScript } from "@react-google-maps/api";
import { CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react";
import { getAccidentPoints } from "../wrapper";

const style: CSSProperties = {
    width: "100vw",
    height: "100vh",
};

const googleMapsLibraries: Libraries = ["places", "visualization"];

function Map() {
    const [zoom, _] = useState<number>(15);
    const [centerPoint, setCenterPoint] = useState<google.maps.LatLngLiteral | null>(null);
    const [accidentPoints, setAccidentPoints] = useState<google.maps.LatLng[]>([]);

    const googleMap = useRef<google.maps.Map | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        googleMap.current = map;
    }, []);

    // const onUnmount = useCallback((_map: google.maps.Map) => {
    //     googleMap.current = null;
    // }, []);

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
                console.log(accidentPoints);
                setAccidentPoints(accidentPoints);
            });
        }

        function updateHeatmap() {
            if (!centerPoint) {
                return;
            }

            const newPosition: google.maps.LatLng | undefined = googleMap.current?.getCenter();
            if (!newPosition) {
                return;
            }

            const newCoordinates: google.maps.LatLngLiteral = {
                lat: newPosition.lat(),
                lng: newPosition.lng(),
            };
            if (centerPoint.lat === newCoordinates.lat && centerPoint.lng === newCoordinates.lng) {
                return;
            }

            setCenterPoint(newCoordinates);

            getAccidentPoints(centerPoint).then((points) => {
                console.log("points", points);
                setAccidentPoints(points);
            });
        }
        const interval = setInterval(() => updateHeatmap(), 5_000);

        return () => clearInterval(interval);
    });

    return isLoaded ? (
        <GoogleMap
            id="map-element"
            center={centerPoint!}
            zoom={zoom}
            mapContainerStyle={style}
            onLoad={onLoad}
        >
            {accidentPoints.length > 0 && <HeatmapLayerF data={accidentPoints} />}
        </GoogleMap>
    ) : (
        <h2>Loading...</h2>
    );
}

export default Map;

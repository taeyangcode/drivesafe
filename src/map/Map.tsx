import { GoogleMap, Libraries, Marker, useLoadScript } from "@react-google-maps/api";
import { CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react";
import { AccidentPoint, Bounds, LargeAccidentPoint, getAccidentPoints } from "../wrapper";

import dangerYellow from "../../assets/danger-yellow.svg";
import dangerOrange from "../../assets/danger-orange.svg";
import dangerRed from "../../assets/danger-red.svg";
import Home from "../home/Home";

const style: CSSProperties = {
    width: "100vw",
    height: "100vh",
};

const googleMapsLibraries: Libraries = ["places", "visualization"];

function Map() {
    const [zoom, _] = useState<number>(15);
    const [centerPoint, setCenterPoint] = useState<google.maps.LatLngLiteral | null>(null);
    const [bounds, setBounds] = useState<Bounds | null>(null);
    const [accidentPoints, setAccidentPoints] = useState<(AccidentPoint | LargeAccidentPoint)[]>(
        [],
    );

    const [googleMapReady, setGoogleMapReady] = useState<boolean>(false);

    const googleMap = useRef<google.maps.Map | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        googleMap.current = map;
        setTimeout(() => setGoogleMapReady(true), 1000);
    }, []);

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
    }, []);

    useEffect(() => {
        if (googleMap.current) {
            const newBounds = googleMap.current.getBounds()!;
            setBounds({
                north: newBounds.getNorthEast().lng(),
                south: newBounds.getSouthWest().lng(),
                east: newBounds.getNorthEast().lat(),
                west: newBounds.getSouthWest().lat(),
            });
        }
    }, [googleMapReady]);

    useEffect(() => {
        if (googleMap.current && bounds && accidentPoints.length === 0) {
            getAccidentPoints(bounds).then((accidentPoints) => {
                console.log(accidentPoints);
                setAccidentPoints(accidentPoints);
            });
        }
    }, [bounds]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!googleMap.current) {
                return;
            }
            const googleMapBounds = googleMap.current!.getBounds()!;
            const currentBounds: Bounds = {
                north: googleMapBounds.getNorthEast().lng(),
                south: googleMapBounds.getSouthWest().lng(),
                east: googleMapBounds.getNorthEast().lat(),
                west: googleMapBounds.getSouthWest().lat(),
            };

            setTimeout(
                () =>
                    getAccidentPoints(currentBounds).then((accidentPoints) => {
                        setAccidentPoints([...accidentPoints]);
                    }),
                2_000,
            );
        }, 1_000);
        return () => clearInterval(interval);
    }, [googleMapReady]);

    function renderAccidentMarkers() {
        if (accidentPoints.length === 0) {
            return;
        }

        if ((accidentPoints[0] as LargeAccidentPoint)?.Count != null) {
            return accidentPoints.map((accidentPoint) => {
                return (
                    <Marker
                        icon={
                            (accidentPoint as LargeAccidentPoint).Count > 1000
                                ? dangerRed
                                : (accidentPoint as LargeAccidentPoint).Count > 500
                                ? dangerOrange
                                : dangerYellow
                        }
                        position={{ lat: accidentPoint.Latitude, lng: accidentPoint.Longitude }}
                    />
                );
            });
        }
        return accidentPoints.map((accidentPoint) => {
            return (
                <Marker position={{ lat: accidentPoint.Latitude, lng: accidentPoint.Longitude }} />
            );
        });
    }

    return isLoaded && centerPoint ? (
        <GoogleMap
            id="map-element"
            center={centerPoint!}
            zoom={zoom}
            mapContainerStyle={style}
            onLoad={onLoad}
        >
            {renderAccidentMarkers()}
        </GoogleMap>
    ) : (
        <Home />
    );
}

export default memo(Map);

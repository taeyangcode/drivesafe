export interface AccidentPoint {
    ID: string;
    Severity: number;
    Latitude: number;
    Longitude: number;
}

export async function getAccidentPoints(
    centerPoint: google.maps.LatLngLiteral,
): Promise<google.maps.LatLng[]> {
    const fetchUrl = new URL("http://127.0.0.1:8000/nearby_accidents");
    fetchUrl.searchParams.set("user_lat", centerPoint!.lat.toString());
    fetchUrl.searchParams.set("user_lng", centerPoint!.lng.toString());

    const accidentPointsResponse = await fetch(fetchUrl);
    const accidentPointsJson: AccidentPoint[] = await accidentPointsResponse.json();

    return accidentPointsJson.map(
        (accidentPoint) => new google.maps.LatLng(accidentPoint.Latitude, accidentPoint.Longitude),
    );
}

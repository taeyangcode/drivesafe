export interface AccidentPoint {
    ID: string;
    Severity: number;
    Latitude: number;
    Longitude: number;
}

export interface LargeAccidentPoint {
    Latitude: number;
    Longitude: number;
    Count: number;
}

export interface Bounds {
    north: number;
    south: number;
    east: number;
    west: number;
}

export async function getAccidentPoints(
    bounds: Bounds,
): Promise<AccidentPoint[] | LargeAccidentPoint[]> {
    const { north, south, east, west } = bounds;

    const fetchUrl = new URL("http://127.0.0.1:8000/nearby_accidents");
    fetchUrl.searchParams.set("north", north.toString());
    fetchUrl.searchParams.set("south", south.toString());
    fetchUrl.searchParams.set("east", east.toString());
    fetchUrl.searchParams.set("west", west.toString());

    const accidentPointsResponse = await fetch(fetchUrl);
    const accidentPointsJson: Object = await accidentPointsResponse.json();

    if (accidentPointsJson.hasOwnProperty("Count")) {
        return accidentPointsJson as LargeAccidentPoint[];
    }
    return accidentPointsJson as AccidentPoint[];
}

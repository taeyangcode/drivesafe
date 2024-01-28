import { useRef } from "react";

type MVCArray = google.maps.MVCArray;

interface HeatmapProps {
    data: google.maps.LatLng[];
}

function Heatmap(props: HeatmapProps) {
    const { HeatmapLayer } = await google.maps.importLibrary("visualization");

    return <> Heatmap </>;
}

export default Heatmap;

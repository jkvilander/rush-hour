import { useRef } from "react";
import { boardHeight, tileSize } from "../constants";
import useMarkerPosition from "../hooks/useMarkerPosition";

export function Marker() {
    const marker = useRef(null);
    useMarkerPosition(marker);

    return (
        <mesh
            position={[0, 0, boardHeight * 4]}
            rotation={[-Math.PI / 2, 0, 0]}
            ref={marker}
        >
            <coneGeometry args={[tileSize * .2, boardHeight * 1.5]} />
            <meshLambertMaterial color={0xff0000} flatShading />
        </mesh>
    )
}
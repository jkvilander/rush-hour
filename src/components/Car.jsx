import { useRef } from "react";
import { tileSize } from "../constants";
import { Wheel } from "./Wheel";
import useVehicleAnimation from "../hooks/useVehicleAnimation";
import { changeSelection } from "../stores/vehicle";
import { updateMarkerPosition } from "../stores/marker";

export function Car({
    id,
    position,
    direction,
    color,
}) {
    const car = useRef(null);
    useVehicleAnimation(car, id, position, direction);

    function handleVehicleClick(e) {
        e.stopPropagation();
        changeSelection(true, id, car);
    }

    if (id == "X") {
        updateMarkerPosition(
            (position.x - 2.5) * tileSize,
            (-position.y + 2.7) * tileSize
        );
    }

    return (
        <group
            position={[
                (position.x - 2.5) * tileSize,
                (-position.y + 2.7) * tileSize,
                .5
            ]}
            rotation-z={direction * Math.PI / 2}
            scale={[tileSize / 36, tileSize / 36, tileSize / 36]}
            ref={car}
            onClick={e => handleVehicleClick(e)}
        >
            <mesh position={[-18, 0, 12]} castShadow receiveShadow>
                <boxGeometry args={[60, 30, 15]} />
                <meshLambertMaterial color={color} flatShading />
            </mesh>
            <mesh position={[-24, 0, 25.5]} castShadow receiveShadow>
                <boxGeometry args={[33, 24, 12]} />
                <meshLambertMaterial color={0xbfdfff} flatShading />
            </mesh>
            <Wheel x={-36} />
            <Wheel x={0} />
        </group>
    );
}
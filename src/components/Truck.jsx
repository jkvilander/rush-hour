import { useRef } from "react";
import { tileSize } from "../constants";
import { Wheel } from "./Wheel";
import useVehicleAnimation from "../hooks/useVehicleAnimation";
import { changeSelection } from "../stores/vehicle";

export function Truck({
    id,
    position,
    direction,
    color,
}) {
    const truck = useRef(null);
    useVehicleAnimation(truck, id, position, direction);

    function handleVehicleClick(e) {
        e.stopPropagation();
        changeSelection(true, id, truck);
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
            ref={truck}
            onClick={e => handleVehicleClick(e)}
        >
        <mesh position={[-15 - 37, 0, 25]} castShadow receiveShadow>
            <boxGeometry args={[70, 35, 35]} />
            <meshLambertMaterial color={0xb4c6fc} flatShading />
        </mesh>
        <mesh position={[35 - 37, 0, 20]} castShadow receiveShadow>
            <boxGeometry args={[30, 30, 30]} />
            <meshLambertMaterial color={color} flatShading />
        </mesh>
            <Wheel x={-35 - 37} />
            <Wheel x={5 - 37} />
            <Wheel x={37 - 37} />
        </group>
    );
}
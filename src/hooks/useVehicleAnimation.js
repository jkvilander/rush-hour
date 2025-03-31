import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { state, stepCompleted } from "../stores/vehicle";
import { tileSize } from "../constants";
import { updateMarkerPosition } from "../stores/marker";

export default function useVehicleAnimation(ref, id, position, direction) {
    const moveClock = new THREE.Clock(false);

    useFrame(() => {
        if (!ref.current) return;
        if (!state.movesQueue.length) return;
        const vehicle = ref.current;

        if (id != state.selected) return;

        if (!moveClock.running) moveClock.start();
        
        const stepTime = 0.2; // Seconds it takes to move a tile
        const progress = Math.min(
            1,
            moveClock.getElapsedTime() / stepTime
        );

        setPosition(vehicle, id, position, progress);

        // Once a move has ended
        if (progress >= 1) {
            stepCompleted(id);
            moveClock.stop();
        }
    });
}

function setPosition(vehicle, id, initialPosition, progress) {
    if (!state.delta[id]) state.delta[id] = {x: 0, y: 0};

    const start = {
        x: initialPosition.x + state.delta[id].x,
        y: initialPosition.y - state.delta[id].y
    };
    let end = {x: start.x, y: start.y};

    if (state.movesQueue[0] === "left") end.x--;
    if (state.movesQueue[0] === "right") end.x++;
    if (state.movesQueue[0] === "forward") end.y--;
    if (state.movesQueue[0] === "backward") end.y++;
    
    vehicle.position.x = THREE.MathUtils.lerp(positionToBoard(start).x, positionToBoard(end).x, progress);
    vehicle.position.y = THREE.MathUtils.lerp(positionToBoard(start).y, positionToBoard(end).y, progress);

    updateMarkerPosition(
        vehicle.position.x,
        vehicle.position.y
    );
}

function positionToBoard(position) {
    return {
        x: (position.x - 2.5) * tileSize,
        y: (-position.y + 2.7) * tileSize
    };
}
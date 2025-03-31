import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { currentLevel } from "../utilities/parseLevel";
import { updateMarkerPosition } from "./marker";

export const state = {
    delta: {},
    movesQueue: [],
    selected: "X",
};

export function queueMove(direction) {
    let currentDelta = state.delta[state.selected];
    if (!currentDelta) currentDelta = {x: 0, y: 0};
    
    const isValidMove = endsUpInValidPosition(
        currentLevel.vehicles.find(vehicle => vehicle.type == state.selected),
        {
            x: currentDelta.x,
            y: currentDelta.y
        },
        [...state.movesQueue, direction],
        state.delta
    );

    if (!isValidMove) return;

    state.movesQueue.push(direction);
}

export function stepCompleted(id) {
    const direction = state.movesQueue.shift();

    if (direction === "forward") state.delta[id].y += 1;
    if (direction === "backward") state.delta[id].y -= 1;
    if (direction === "left") state.delta[id].x -= 1;
    if (direction === "right") state.delta[id].x += 1;
}

export function changeSelection(shift = false, selection = null, vehicle = null) {
    if (selection) {
        state.selected = selection;
        updateMarkerPosition(vehicle.current.position.x, vehicle.current.position.y);
    } else {
        state.selected = currentLevel.vehicles[
            (
                currentLevel.vehicles.findIndex(v => v.type == state.selected)
                + (
                    !shift
                    ? 1
                    : currentLevel.vehicles.length - 1
                )
            )
            % currentLevel.vehicles.length
        ].type;
    }
}
import { calculateFinalPosition } from "./calculateFinalPosition";
import { currentLevel } from "./parseLevel";

export function endsUpInValidPosition(vehicle, currentPosition, moves, allVehicleDelta) {
    // Calculate where the vehicle would end up after the move
    const finalPosition = calculateFinalPosition(
        currentPosition,
        moves
    );
    const vehicleLength = !["O", "P", "Q", "R"].includes(vehicle.type) ? 2 : 3;
    
    // Constrict movement to vehicle direction
    if (
        (
            (
                vehicle.direction == 0 ||
                vehicle.direction == 2
            ) && currentPosition.y != finalPosition.y
        ) ||
        (
            (
                vehicle.direction == 1 ||
                vehicle.direction == 3
            ) && currentPosition.x != finalPosition.x
        )
    ) return false;

    // Detect if we hit the edge of the board
    if (
        vehicle.x + finalPosition.x - (vehicle.direction == 0 ? vehicleLength - 1 : 0) < 0 ||
        vehicle.x + finalPosition.x + (vehicle.direction == 2 ? vehicleLength - 1 : 0) > 5 + (vehicle.type == "X" ? 3 : 0) ||
        vehicle.y - finalPosition.y - (vehicle.direction == 3 ? vehicleLength - 1 : 0) < 0 ||
        vehicle.y - finalPosition.y + (vehicle.direction == 1 ? vehicleLength - 1 : 0) > 5
    ) return false;

    // Detect if we hit another vehicle
    if (currentLevel.vehicles.some(v => {
        if (v.type == vehicle.type) return false;
        let vd = {x: 0, y: 0};
        if (allVehicleDelta[v.type]) vd = allVehicleDelta[v.type];
        
        return vehicleToCells(
            vehicle.x + finalPosition.x,
            vehicle.y - finalPosition.y,
            vehicle.type,
            vehicle.direction
        ).some(cell => vehicleToCells(
            v.x + vd.x,
            v.y - vd.y,
            v.type,
            v.direction
        ).find(c => c.x == cell.x && c.y == cell.y));
    })) return false;

    // Detect if we have completed the puzzle?

    return true;
}

function vehicleToCells(x, y, type, direction) {
    let cells = [];

    const vehicleLength = !["O", "P", "Q", "R"].includes(type) ? 2 : 3;
    let dx = 0, dy = 0;
    if (direction == 0) {
        dx = -1;
    } else if (direction == 1) {
        dy = 1;
    } else if (direction == 2) {
        dx = 1;
    } else if (direction == 3) {
        dy = -1;
    }

    for (let i = 0; i < vehicleLength; i++) {
        cells.push({x: x + dx * i, y: y + dy * i});
    }
    return cells;
}
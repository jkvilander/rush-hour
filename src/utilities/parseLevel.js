import { levels } from "../metadata";

export const currentLevel = {
    vehicles: null,
};

export function parseLevel(levelIndex) {
    const levelData = levels[levelIndex]
        .reduce((cells, row, y) => [
            ...cells,
            ...row
                .split("")
                .map((cell, x) => ({x, y, cell}))
        ], []);

    const vehicles = levelData
        .filter(cell => cell.cell.toLowerCase() != cell.cell)
        .map(vehicle => {
            const trunk = levelData.find(cell => cell.cell == vehicle.cell.toLowerCase());
            const direction = 
                trunk.x < vehicle.x
                    ? 0 :
                trunk.x > vehicle.x
                    ? 2 :
                trunk.y < vehicle.y
                    ? 3 : 1;

            return {
                x: vehicle.x,
                y: vehicle.y,
                type: vehicle.cell,
                direction: direction
            };
        });

    currentLevel.vehicles = vehicles;
    return vehicles;
}
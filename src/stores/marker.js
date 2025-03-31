export const state = {
    x: 0,
    y: 0,
};

export function updateMarkerPosition(x, y) {
    state.x = x;
    state.y = y;
}
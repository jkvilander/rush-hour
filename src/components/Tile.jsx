import { borderWidth, tileMargin, tileSize } from "../constants";

export function Tile({ position }) {
    return (
        <mesh position={[
            tileSize * (position.x + .5) - tileSize * 3,
            tileSize * (position.y + .5) - tileSize * 3 + borderWidth / 2,
            .6 / 2
        ]} castShadow receiveShadow>
            <boxGeometry args={[
                tileSize * (1 - tileMargin * 2),
                tileSize * (1 - tileMargin * 2),
                .6
            ]} />
            <meshLambertMaterial color={0xffffff} flatShading />
        </mesh>
    );
}
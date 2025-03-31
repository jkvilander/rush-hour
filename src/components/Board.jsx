import { Bounds } from "@react-three/drei";
import { boardHeight, borderWidth, tileSize } from "../constants";
import { Tile } from "./Tile";

export function Board({ children }) {
    return (
        <Bounds fit clip observe margin={1.5}>
            <group>
                <mesh position={[0, 0, -boardHeight / 2]} receiveShadow>
                    <boxGeometry args={[
                        tileSize * 6 + borderWidth * 2,
                        tileSize * 6 + borderWidth * 3,
                        boardHeight
                    ]} />
                    <meshLambertMaterial color={0xffffff} flatShading />
                </mesh>
                <mesh position={[0, -tileSize * 3 - borderWidth / 2, boardHeight / 2]} castShadow receiveShadow>
                    <boxGeometry args={[
                        tileSize * 6 + borderWidth * 2,
                        borderWidth * 2,
                        boardHeight
                    ]} />
                    <meshLambertMaterial color={0xffffff} flatShading />
                </mesh>
                <mesh position={[0, tileSize * 3 + borderWidth, boardHeight / 2]} castShadow receiveShadow>
                    <boxGeometry args={[
                        tileSize * 6 + borderWidth * 2,
                        borderWidth,
                        boardHeight
                    ]} />
                    <meshLambertMaterial color={0xffffff} flatShading />
                </mesh>
                <mesh position={[-tileSize * 3 - borderWidth / 2, 0, boardHeight / 2]} castShadow receiveShadow>
                    <boxGeometry args={[
                        borderWidth,
                        tileSize * 6 + borderWidth * 3,
                        boardHeight
                    ]} />
                    <meshLambertMaterial color={0xffffff} flatShading />
                </mesh>
                <mesh position={[
                    tileSize * 3 + borderWidth / 2,
                    -(tileSize * 3 + borderWidth) / 2,
                    boardHeight / 2
                ]} castShadow receiveShadow>
                    <boxGeometry args={[
                        borderWidth,
                        tileSize * 3 + borderWidth * 2,
                        boardHeight
                    ]} />
                    <meshLambertMaterial color={0xffffff} flatShading />
                </mesh>
                <mesh position={[
                    tileSize * 3 + borderWidth / 2,
                    tileSize * 2 + borderWidth,
                    boardHeight / 2
                ]} castShadow receiveShadow>
                    <boxGeometry args={[
                        borderWidth,
                        tileSize * 2 + borderWidth,
                        boardHeight
                    ]} />
                    <meshLambertMaterial color={0xffffff} flatShading />
                </mesh>

                {Array(6).fill(0).map((r, y) => Array(6).fill(0).map((c, x) => (
                    <Tile key={`${y}-${x}`} position={{x, y}} />
                )))}
            </group>

            {children}
        </Bounds>
    );
}
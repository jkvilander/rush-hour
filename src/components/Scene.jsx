import { Canvas } from "@react-three/fiber";
import { DirectionalLight } from "./DirectionalLight";
import { OrbitControls } from "@react-three/drei";

export const Scene = ({ children }) => {
    return (
        <Canvas
            orthographic={true}
            shadows={true}
            camera={{
                up: [0, 0, 1],
                position: [300, -300, 300],
            }}
        >
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minAzimuthAngle={-Math.PI / 4 * 0}
                maxAzimuthAngle={Math.PI / 4}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6 * 3}
            />
            <ambientLight />
            <DirectionalLight />
            {children}
        </Canvas>
    );
};
export function Wheel({ x }) {
    return (
        <mesh position={[x, 0, 6]}>
            <cylinderGeometry args={[6, 6, 33]} />
            <meshLambertMaterial color={0x333333} flatShading />
        </mesh>
    );
  }
import { useFrame } from "@react-three/fiber";
import { state } from "../stores/marker";

export default function useMarkerPosition(ref) {
    useFrame(() => {
        if (!ref.current) return;
        const marker = ref.current;

        marker.position.x = state.x;
        marker.position.y = state.y;
    });
}
import { useEffect } from "react";
import { queueMove, changeSelection } from "../stores/vehicle";

export default function useEventListeners() {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowUp" || event.key === "w") {
                event.preventDefault();
                queueMove("forward");
            } else if (event.key === "ArrowDown" || event.key === "s") {
                event.preventDefault();
                queueMove("backward");
            } else if (event.key === "ArrowLeft" || event.key === "a") {
                event.preventDefault();
                queueMove("left");
            } else if (event.key === "ArrowRight" || event.key === "d") {
                event.preventDefault();
                queueMove("right");
            } else if (event.key === "Tab") {
                event.preventDefault();
                queueMove("tab");
                changeSelection(event.shiftKey);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
}
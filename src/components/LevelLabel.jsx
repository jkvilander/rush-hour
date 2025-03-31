import { levelDifficulty } from "../metadata";

export function LevelLabel({ level }) {
    const difficulty = levelDifficulty(level);
    
    return (
        <div className={"level " + difficulty}>
            <span>{level}</span>
            <div>{ difficulty }</div>
        </div>
    );
}
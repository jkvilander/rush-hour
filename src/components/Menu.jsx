import { levelDifficulty, levels } from "../metadata";
import useStore from "../stores/menu";
import "./Menu.css";

export function Menu({ toggle }) {
    return (
        <div className={"menu" + (useStore(state => state.visible) || !toggle ? " visible" : "")}>
            <span>Level Menu</span>
            {Array(levels.length - 1).fill(0).map((e, i) => {
                return (
                    <a
                        key={i}
                        className={levelDifficulty(i + 1)}
                        href={"?level=" + (i + 1)}
                    >{i + 1}</a>
                );
            })}
        </div>
    );
}
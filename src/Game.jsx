import { Title } from "./components/Title";
import { Menu } from "./components/Menu";
import { LevelLabel } from "./components/LevelLabel";
import { Scene } from "./components/Scene";
import { Board } from "./components/Board";
import { Controls } from "./components/Controls";
import { parseLevel } from "./utilities/parseLevel";
import { vehicleColor } from "./metadata";
import { Car } from "./components/Car";
import { Truck } from "./components/Truck";
import { Marker } from "./components/Marker";
import "./Game.css";

export default function Game() {
    const query = location.search;
    const params =  new URLSearchParams(query);
    const level = parseInt(params.get("level"));

    return (
        <div className="game">
            <Title />
            {level ? <>
                <LevelLabel level={level}/>
                <Scene>
                    <Board>
                        <Marker />

                        {parseLevel(level).map(vehicle =>
                            (!["O", "P", "Q", "R"].includes(vehicle.type))
                                ? (
                                    <Car
                                        key={vehicle.type}
                                        id={vehicle.type}
                                        position={{x: vehicle.x, y: vehicle.y}}
                                        direction={vehicle.direction}
                                        color={vehicleColor[vehicle.type]}
                                    />
                                ) : (
                                    <Truck
                                        key={vehicle.type}
                                        id={vehicle.type}
                                        position={{x: vehicle.x, y: vehicle.y}}
                                        direction={vehicle.direction}
                                        color={vehicleColor[vehicle.type]}
                                    />
                                )
                        )}
                    </Board>
                </Scene>
                <Controls />
                <Menu toggle={true} />
            </> : <>
                <Menu toggle={false} />
            </>}
        </div>
    );
}
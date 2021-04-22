import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import {
    ShipCellLG,
    ShipOrientationWrapper,
    OrientationFrame,
} from "./styles/components";
export const Orientation = ({
    ship,
    horizontalPlacement,
    toggleHorizontal,
}) => {
    return (
        <OrientationFrame onClick={toggleHorizontal}>
            <ShipOrientationWrapper horizontalPlacement={horizontalPlacement}>
                {/* {Array(ship.length).fill(<ShipCellLG />)} */}
                {Array.from({length:ship.length},(_,index)=> <ShipCellLG key={`orientation_${index}`}/>)}
            </ShipOrientationWrapper>
            <FontAwesomeIcon id="rotateButton" icon={faSync} />
        </OrientationFrame>
    );
};

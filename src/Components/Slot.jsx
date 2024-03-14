import Blue from "../Assets/Blue.svg";
import Yellow from "../Assets/Yellow.svg";


const Slot = ({ch, y, x}) => {
    return (
        <div className="slot" x={x} y={y}>
            {ch &&(
                <img src = {ch === "X" ? Blue : Yellow}
                width="100%" height = "100%" />
            )}
        </div>
    )
}

export default Slot
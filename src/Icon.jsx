import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function GetIcon({icon , text}){
    return(
        <p>
            <FontAwesomeIcon icon={icon} style={{ marginRight: "10px" }} />
            <span>{text}</span>
        </p>
    )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faImage, faGear, faLocationDot, faThLarge } from "@fortawesome/free-solid-svg-icons";
import GetIcon from "./Icon";
import Cast from "./forecast";  // Ensure proper import
import "./SideBar.css";
import { useState } from "react";
import WeatherApp from "./WeatherApp";

export default function SideBar() { 
    let [selectedComponent, setSelectedComponent] = useState(<WeatherApp/>);

    let setPage = (page) => {
        setSelectedComponent(page);
    };

    return (
        <>
            <div id="side_bar">
                <div className="Title">
                    <p id="climate_view"> Climate View </p> 
                </div>
                <div className="list">
                    <div  className = "list_item"
                        onClick={() => setPage(<WeatherApp/>)} >
                        <GetIcon icon={faThLarge} text="Overview"/>
                    </div>
                    <div  className="list_item"
                        onClick={() => setPage(<Cast/>)} >
                        <GetIcon icon={faCalendarDays} text="Forecast" />
                    </div>
                    <div className="list_item">
                        <GetIcon icon={faLocationDot} text="Location"/>
                    </div >
                    <div  className="list_item">
                        <GetIcon icon={faImage} text="Event Planner"/>
                    </div>
                    <div className="list_item">
                        <GetIcon icon={faGear} text="Setting"/>
                    </div>
                </div>
            </div>

            {/* Display the selected component */}
            <div className="content">
                {selectedComponent}
            </div>
        </>
    );
}

import WeatherApp from "./WeatherApp";
import "./App.css";
import SideBar from "./SideBar"; // Corrected Import

function App() {
  return (
    <>
      <div className="outer_box">
        <div className="inner_box">
          <SideBar /> 
        </div>
      </div>
       
    </>
  );
}

export default App;

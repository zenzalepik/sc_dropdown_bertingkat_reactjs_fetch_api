import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Dropdown1Provinces from './Dropdown1Provinces';
import Dropdown2Regencies from './Dropdown2Regencies';import { LocationProvider } from "./context/LocationContext";
import Dropdown3Districts from './Dropdown3Districts';
import Dropdown4Villages from './Dropdown4Villages';


function App() {
  const [idProvince, setIdProvince] = useState("");

  // Fungsi untuk menangkap perubahan idProvince
    const handleProvinceChange = (id) => {
      console.log("Selected Province ID in App:", id);
      setIdProvince(id);
    };
  return (
    <LocationProvider>
    <div className="App">
    <Dropdown1Provinces />
    <Dropdown2Regencies/>
    <Dropdown3Districts/>
    <Dropdown4Villages/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    </LocationProvider>
  );
}

export default App;

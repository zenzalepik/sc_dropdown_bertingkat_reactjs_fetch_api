import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Dropdown1Provinces from './Dropdown1Provinces';
import Dropdown2Regencies from './Dropdown2Regencies';import { LocationProvider, useLocationContext } from "./context/LocationContext";
import Dropdown3Districts from './Dropdown3Districts';
import Dropdown4Villages from './Dropdown4Villages';

function AppContent() {
      const { setIdProvince, setIdRegency, setIdDistrict, setIdVillage, idProvince, idRegency, idDistrict, idVillage } = useLocationContext();
      return (
        <>

        <Dropdown1Provinces />
        <Dropdown2Regencies/>
        <Dropdown3Districts/>
        <Dropdown4Villages/>
        {idProvince && (<p>setIdProvince {idProvince}<b></b> <br /></p>)}
        {idRegency && (<p>setIdRegency {idRegency}<b></b> <br /></p>)}
        {idDistrict && (<p>setIdDistrict {idDistrict}<b></b> <br /></p>)}
        {idVillage && (<p>setIdVillage {idVillage}<b></b> <br /></p>)}
        </>
      )
}

function App() {
  return (
    <LocationProvider>
    <div className="App">
    <AppContent />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    </LocationProvider>
  );
}

export default App;

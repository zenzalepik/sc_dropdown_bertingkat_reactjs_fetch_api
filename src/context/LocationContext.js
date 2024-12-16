import React, { createContext, useContext, useState } from "react";

// 1. Buat Context
const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [idProvince, setIdProvince] = useState("");
  const [idRegency, setIdRegency] = useState("");
  const [idDistrict, setIdDistrict] = useState("");
  const [idVillage, setIdVillage] = useState("");


  // const [selectedProvince, setSelectedProvince] = useState("");

  return (
    <LocationContext.Provider
      value={{
        idProvince,
        setIdProvince,
        idRegency,
        setIdRegency,
        idDistrict,
        setIdDistrict,
        idVillage,
        setIdVillage,

        // setSelectedProvince
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

// 2. Custom Hook untuk Menggunakan Context
export function useLocationContext() {
  return useContext(LocationContext);
}

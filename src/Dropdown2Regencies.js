import React, { useState, useEffect } from "react";
import { Form, Select, Spin } from "antd";
import { useLocationContext } from "./context/LocationContext";
import { config } from "./constants";

const { Option } = Select;

const DropdownRegencies = () => {
  const { setIdProvince, setIdRegency, setIdDistrict, setIdVillage, idProvince, idRegency } = useLocationContext();

  const [regencies, setRegencies] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch regencies from API
  useEffect(() => {
    if (!idProvince)
      return; // Jangan fetch jika idProvince kosong

    const fetchRegencies = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch(
          `${config.apiAddress}/regencies/${idProvince}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch regencies");
        }
        const data = await response.json();
        console.log("Fetched regencies:", data);
        setRegencies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching regencies:", error);
        setRegencies([]);
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchRegencies();

    setRegencies([]);
    setSelectedRegency("");
    setIdRegency("");
  }, [idProvince]); // Gunakan idProvince dalam dependency array

  const handleChange = (value) => {
    const [id, name] = value.split("-");
    setSelectedRegency(name.trim());
    setIdRegency(id.trim());
    console.log("Selected Regency:", value);
    console.log("id Regency:", id, "-", "name Regency:", name);
  };

  return (
  (idProvince != null && idProvince != '') ?
    <div>
      <Form layout="vertical">
        <Form.Item label="Pilih Kabupaten/Kota">
          {loading ? (
            <Spin /> // Tampilkan spinner jika masih loading
          ) : (
            <Select
              placeholder="---Pilih Kabupaten/Kota---"
              onChange={handleChange}
              notFoundContent="Data tidak ditemukan"
            >
              {regencies?.map((regency) => (
                <Option key={regency.id} value={`${regency.id} - ${regency.name}`}>
                  {regency.name}
                </Option>
              ))}
            </Select>
          )}
          {selectedRegency && (
            <p>
              Kabupaten/Kota Terpilih: {idRegency} - {selectedRegency}
            </p>
          )}
        </Form.Item>
      </Form>
    </div>
    :
  null
  );
};

export default DropdownRegencies;

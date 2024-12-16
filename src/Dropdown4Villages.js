import React, { useState, useEffect } from "react";
import { Form, Select, Spin } from "antd";
import { useLocationContext } from "./context/LocationContext";
import { config } from "./constants";

const { Option } = Select;

const DropdownVillages = () => {
  const { setIdProvince, setIdRegency, setIdDistrict, setIdVillage, idProvince, idRegency, idDistrict, idVillage } = useLocationContext();

  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch villages from API
  useEffect(() => {
    if (!idProvince, !idRegency, !idDistrict) return; // Jangan fetch jika idDistrict kosong

    const fetchVillages = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch(
          `${config.apiAddress}/villages/${idDistrict}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch villages");
        }
        const data = await response.json();
        console.log("Fetched villages:", data);
        setVillages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching villages:", error);
        setVillages([]);
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    setVillages([]);
    setSelectedVillage();
    setIdVillage();
    fetchVillages();
  }, [idProvince, idRegency, idDistrict]); // Gunakan idProvince dalam dependency array

  const handleChange = (value) => {
    const [id, name] = value.split("-");
    setSelectedVillage(name.trim());
    setIdVillage(id.trim());
    console.log("Selected Village:", value);
    console.log("id Village:", id, "-", "name Village:", name);
  };

  return (
  (idDistrict != null && idDistrict != '') ?
    <div>
      <Form layout="vertical">
        <Form.Item label="Pilih Desa">
          {loading ? (
            <Spin /> // Tampilkan spinner jika masih loading
          ) : (
            <Select
              placeholder="---Pilih Desa---"
              onChange={handleChange}
              notFoundContent="Data tidak ditemukan"
            >
              {villages?.map((village) => (
                <Option key={village.id} value={`${village.id} - ${village.name}`}>
                  {village.name}
                </Option>
              ))}
            </Select>
          )}
          {selectedVillage && (
            <p>
              Desa Terpilih: {idVillage} - {selectedVillage}
            </p>
          )}
        </Form.Item>
      </Form>
    </div>
    :
  null
  );
};

export default DropdownVillages;

import React, { useState, useEffect } from "react";
import { Form, Select, Spin } from "antd";
import { useLocationContext } from "./context/LocationContext";

const { Option } = Select;

const Dropdown3Districts = () => {
  const { setIdProvince, setIdRegency, setIdDistrict, setIdVillage, idProvince, idRegency, idDistrict } = useLocationContext();

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch districts from API
  useEffect(() => {
    if (!idProvince || !idRegency) return; // Jangan fetch jika idRegency kosong

    const fetchDistricts = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch(
          `https://sc-copy-api-wilayah-indonesia-master-yhe2.vercel.app/api/districts/${idRegency}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch districts");
        }
        const data = await response.json();
        console.log("Fetched districts:", data);
        setDistricts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setDistricts([]);
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchDistricts();

    setDistricts([]);
    setSelectedDistrict("");
    setIdDistrict("");
  }, [idProvince, idRegency]); // Gunakan idProvince dalam dependency array

  const handleChange = (value) => {
    const [id, name] = value.split("-");
    setSelectedDistrict(name.trim());
    setIdDistrict(id.trim());
    console.log("Selected District:", value);
    console.log("id District:", id, "-", "name District:", name);
  };

  return (
  (idRegency != null && idRegency != '') ?
    <div>
      <Form layout="vertical">
        <Form.Item label="Pilih Kecamatan">
          {loading ? (
            <Spin /> // Tampilkan spinner jika masih loading
          ) : (
            <Select
              placeholder="---Pilih Kecamatan---"
              onChange={handleChange}
              notFoundContent="Data tidak ditemukan"
            >
              {districts?.map((regency) => (
                <Option key={regency.id} value={`${regency.id} - ${regency.name}`}>
                  {regency.name}
                </Option>
              ))}
            </Select>
          )}
          {selectedDistrict && (
            <p>
              Kecamatan Terpilih: {idDistrict} - {selectedDistrict}
            </p>
          )}
        </Form.Item>
      </Form>
    </div>
    :
  null
  );
};

export default Dropdown3Districts;

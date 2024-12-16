import React, { useState, useEffect } from "react";
import { Form, Select, Spin } from "antd";
import { useLocationContext } from "./context/LocationContext";

const { Option } = Select;

const Dropdown1Provinces = () => {
  const { setIdProvince, setIdRegency, setIdDistrict, setIdVillage, idProvince } = useLocationContext();

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [loading, setLoading] = useState(true); // Tambahkan state untuk loading

  // Fetch provinces from API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://sc-copy-api-wilayah-indonesia-master-yhe2.vercel.app/api/provinces.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch provinces");
        }
        const data = await response.json();
        console.log("Fetched provinces:", data); // Debugging API response
        setProvinces(Array.isArray(data) ? data : []); // Pastikan selalu berupa array
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setProvinces([]); // Set sebagai array kosong jika terjadi error
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchProvinces();
  }, []);

  const handleChange = (value) => {
    const [id, name] = value.split("-");
    setSelectedProvince(name.trim());
    setIdProvince(id.trim());
    console.log("Selected Province:", value);
    console.log("id Province:", id, "-", "name Province:", name);
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Pilih Provinsi">
          {loading ? (
            <Spin /> // Tampilkan spinner jika masih loading
          ) : (
            <Select
              placeholder="---Pilih Provinsi---"
              onChange={handleChange}
              notFoundContent="Data tidak ditemukan"
            >
              {provinces?.map((province) => (
                <Option key={province.id} value={`${province.id} - ${province.name}`}>
                  {province.name}
                </Option>
              ))}
            </Select>
          )}
          {selectedProvince && (
            <p>
              Provinsi Terpilih: {idProvince} - {selectedProvince}
            </p>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Dropdown1Provinces;

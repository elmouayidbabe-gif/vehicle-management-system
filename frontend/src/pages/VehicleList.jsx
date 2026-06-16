import { useEffect, useState } from "react";
import { getVehicles } from "../services/vehicleService";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicles()
      .then(res => setVehicles(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Vehicles</h1>

      {vehicles.length === 0 ? (
        <p>No vehicles found</p>
      ) : (
        vehicles.map(v => (
          <div key={v.id}>
            {v.marque} - {v.modele} - {v.annee}
          </div>
        ))
      )}
    </div>
  );
}
import { useState } from "react";
import Card from "../../Components/Card/Card";
import axiosInstance from "../../services/axiosInstance";

const SpaceXData = () => {
  const [lunches, setLunches] = useState([]);

  axiosInstance
    .get("/v3/launches")
    .then((res) => {
      setLunches(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="container">
      <div className="row g-3">
        {lunches &&
          lunches.length > 0 &&
          lunches.map((lunch) => {
            return (
              <div className="col-12 col-md-6 col-lg-4">
                <Card lunch={lunch} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SpaceXData;

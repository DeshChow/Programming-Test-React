import React from "react";
import axiosInstance from "../../services/axiosInstance";

const SpaceXData = () => {
  axiosInstance
    .get("/v3/launches")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return <div></div>;
};

export default SpaceXData;

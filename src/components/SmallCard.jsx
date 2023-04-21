import React from "react";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const SmallCard = ({ wname, temp }) => {
  return (
    <div className="flex bg-white items-center mt-2 h-12 mx-2 justify-between ">
      <h2 className="text-start text-gray-600 font-semibold">{wname}</h2>
      <WbSunnyOutlinedIcon fontSize="large" sx={{ fontSize: "20px" }} />
      <h3>
        <strong>{temp}</strong>
      </h3>
    </div>
  );
};

export default SmallCard;

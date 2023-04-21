import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = (props) => {
  return (
    <>
      <div className="relative flex items-center justify-between my-auto mx-auto space-x-4">
        <div className="flex items-center space-x-5">
          <p className="text-white bg-black rounded-md p-2 cursor-pointer">
            News
          </p>
          <p className="cursor-pointer">Portal</p>
        </div>
        <div className="flex">
          <SearchIcon />
          <LogoutIcon />
        </div>
      </div>
    </>
  );
};

export default Navbar;

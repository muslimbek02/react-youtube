import { useContext } from "react";
import { Link } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";
import SearchBar from "./SearchBar";

const Header = () => {
  const { loading } = useContext(Context);

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 p-3 md:px-5 bg-black">
      {loading && <Loader />}

      <div className="flex h-5 items-center">
        <Link to="/" className="flex h-5 items-center">
          <img className="h-full hidden md:block" src={ytLogo} alt="YouTube" />
          <img
            className="h-full block md:hidden"
            src={ytLogoMobile}
            alt="YouTube"
          />
        </Link>
      </div>

      {/* Search Bar  */}
      <SearchBar />

      {/* Icons  */}
      <div className="flex items-center">
        <div className="md:flex md:items-center">
          <div className="hidden md:flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="text-white text-xl cursor-pointer" />
          </div>
          <div className="hidden md:flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-white text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

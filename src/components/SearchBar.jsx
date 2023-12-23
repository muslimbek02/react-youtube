import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const searchQueryHandler = (evt) => {
    evt.preventDefault();
    
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <form className="group flex items-center" onSubmit={searchQueryHandler}>
      <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
        <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
          <IoIosSearch className="text-white text-xl" />
        </div>
        <input
          type="text"
          className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          value={searchQuery}
        />
      </div>
      <button className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]">
        <IoIosSearch className="text-white text-xl" />
      </button>
    </form>
  );
};

export default SearchBar;

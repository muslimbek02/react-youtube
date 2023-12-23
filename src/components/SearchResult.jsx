import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchingData } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [results, setResults] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchingData(`search?part=snippet,id&q=${searchQuery}`).then((res) => {
      console.log(res);
      setResults(res?.items);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {results?.map((item) => (
            <SearchResultVideoCard key={item.id.videoId} video={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

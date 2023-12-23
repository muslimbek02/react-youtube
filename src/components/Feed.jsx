import { useContext, useEffect } from "react";
import { Context } from "./../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";
import { fetchingData } from "../utils/api";


const Feed = () => {
  const { loading, searchResults, setLoading, setSearchResults, selectedCategories } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");

    const fetchSelectedCategoryData = (query) => {
      setLoading(true);
      fetchingData(`search?part=snippet&q=${query}`).then(({items}) => {
        console.log(items);
        setSearchResults(items);
        setLoading(false);
      });
    };

    fetchSelectedCategoryData(selectedCategories);
  }, [selectedCategories]);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading &&
            searchResults?.map((item) => {
              return (
                <VideoCard key={item?.id?.videoId} video={item} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;

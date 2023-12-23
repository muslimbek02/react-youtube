import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchingData } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {
  const [videoDetails, setVideoDeatils] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchingData(`videos?part=contentDetails,snippet,statistics&id=${id}`).then(
      ({ items }) => {
        setVideoDeatils(items[0]);
        setLoading(false);
      }
    );
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchingData(`search?part=snippet,id&relatedToVideoId=${id}`).then(
      (res) => {
        setRelatedVideos(res.items);
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex justify-center flex-row bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {videoDetails?.snippet?.title}
          </div>
          {videoDetails?.snippet?.tags && (
            <div>
              {videoDetails?.snippet?.tags.map((item, idx) => {
                return (
                  <span key={idx} className="text-white/[0.5]">
                    #{item}
                  </span>
                );
              })}
            </div>
          )}
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={videoDetails?.snippet?.thumbnails?.high?.url}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {videoDetails?.snippet?.channelTitle}
                  <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              {videoDetails?.statistics?.likeCount && (
                <div className="flex items-center justify-center h-11 px-3 rounded-3xl bg-white/[0.15]">
                  <AiOutlineLike className="text-xl text-white mr-2" />
                  {`${videoDetails?.statistics?.likeCount}, Likes`}
                </div>
              )}
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                {`${abbreviateNumber(
                  videoDetails?.statistics?.viewCount,
                  2
                )}, Views`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.map((item, index) => {
            return <SuggestionVideoCard key={index} video={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;

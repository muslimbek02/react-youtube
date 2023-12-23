import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: 50
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY.toString(),
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchingData = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
